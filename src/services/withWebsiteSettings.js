import axios from "axios";
import { client } from "@/src/graphql";
import { GET_WEBSITE_SETTINGS } from "@/src/graphql/queries/settings";
import { GET_CONTACT_DETAILS, GET_HEADER_SOCIAL, GET_HOME_SOCIAL_MEDIA } from "@/src/graphql/queries/contact";

// WordPress CMS base URL
const WORDPRESS_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

/**
 * Extract title from og:title meta tag in HTML head string
 * Handles various meta tag formats from Rank Math
 * @param {string} headHTML - HTML string containing head tags
 * @returns {string|null} Extracted title or null
 */
function extractTitleFromHead(headHTML) {
   if (!headHTML) return null;

   // Try og:title meta tag (flexible regex for different formats)
   // Handles: <meta property="og:title" content="..." /> or <meta content="..." property="og:title" />
   const ogTitlePatterns = [
      /<meta[^>]*property\s*=\s*["']og:title["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*content\s*=\s*["']([^"']+)["'][^>]*property\s*=\s*["']og:title["'][^>]*>/i,
   ];

   for (const pattern of ogTitlePatterns) {
      const match = headHTML.match(pattern);
      if (match && match[1]) {
         return match[1].trim();
      }
   }

   return null;
}

/**
 * Fetch SEO data from Rank Math REST API
 * @param {string} pageUrl - The full URL of the current page
 * @returns {Promise<{success: boolean, head: string|null, title: string|null}>}
 */
async function fetchRankMathSEO(pageUrl) {
   try {
      const rankMathEndpoint = `${WORDPRESS_BASE_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(pageUrl)}`;

      const response = await axios.get(rankMathEndpoint, {
         headers: {
            "Content-Type": "application/json",
         },
      });

      const data = response.data;
      const head = data.head || null;
      const title = extractTitleFromHead(head);

      return {
         success: data.success || false,
         head: head,
         title: title,
      };
   } catch (error) {
      return {
         success: false,
         head: null,
         title: null,
      };
   }
}

/**
 * Build the WordPress page URL from Next.js context
 * Rank Math needs the WordPress site URL, not the Next.js frontend URL
 * @param {Object} ctx - Next.js getServerSideProps context
 * @returns {string} Full WordPress URL of the current page
 */
function buildWordPressPageUrl(ctx) {
   const path = ctx?.resolvedUrl || ctx?.req?.url || "/";
   // Remove query string if present
   const cleanPath = path.split("?")[0];
   // Construct WordPress URL
   return `${WORDPRESS_BASE_URL}${cleanPath}`;
}

export function withWebsiteSettings(gssp) {
   return async (ctx) => {
      // 1) Fetch settings ONCE per request
      let settingsResponse;
      try {
         settingsResponse = await client.query({ 
            query: GET_WEBSITE_SETTINGS,
            fetchPolicy: "no-cache", // Always fetch fresh settings from WordPress
         });
      } catch (error) {
         settingsResponse = { data: null };
      }

      // 1b) Fetch contact details from options page
      let contactDataFromOptions = null;
      try {
         const contactResponse = await client.query({
            query: GET_CONTACT_DETAILS,
            fetchPolicy: "no-cache",
         });
         let raw = contactResponse?.data?.contactInfoFields?.contactDetailsFields?.contactDetails ?? null;
         if (Array.isArray(raw) && raw.length > 0) raw = raw[0];
         contactDataFromOptions = raw;
      } catch (error) {
         // Contact options may not exist yet; keep null
      }

      // 1c) Fetch header social: options first, then home page so all pages can show it
      let socialMediaFromOptions = [];
      try {
         const socialResponse = await client.query({
            query: GET_HEADER_SOCIAL,
            fetchPolicy: "no-cache",
         });
         const raw = socialResponse?.data?.contactInfoFields?.socialMedia;
         socialMediaFromOptions = Array.isArray(raw) ? raw : (raw ? [raw] : []);
      } catch (_) {
         // Header social from options is optional
      }
      if (socialMediaFromOptions.length === 0) {
         try {
            const homeSocialResponse = await client.query({
               query: GET_HOME_SOCIAL_MEDIA,
               fetchPolicy: "no-cache",
            });
            const homeRaw = homeSocialResponse?.data?.nodeByUri?.homePageFields?.socialMedia;
            socialMediaFromOptions = Array.isArray(homeRaw) ? homeRaw : (homeRaw ? [homeRaw] : []);
         } catch (_) {}
      }

      // 2) Fetch Rank Math SEO data for current page
      let seoData = { success: false, head: null, title: null };
      try {
         const wordPressPageUrl = buildWordPressPageUrl(ctx);
         seoData = await fetchRankMathSEO(wordPressPageUrl);
      } catch (error) {
         console.error("[SEO] Unexpected error in SEO fetch:", error);
      }

      // 3) Call the page's original getServerSideProps (if any)
      // If the page has its own getServerSideProps, execute it; otherwise use empty props
      const originalResult = gssp ? await gssp(ctx) : { props: {} };

      // If the page did redirect / notFound, just return it
      if ("redirect" in originalResult || "notFound" in originalResult) {
         return originalResult;
      }

      // 4) Merge websiteSettings, contact details, social, and SEO data into props
      return {
         props: {
            ...originalResult.props,
            websiteSettings: settingsResponse?.data ?? null,
            contactDataFromOptions: contactDataFromOptions,
            socialMediaFromOptions: socialMediaFromOptions,
            seo: seoData,
         },
      };
   };
}
