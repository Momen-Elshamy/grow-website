import axios from "axios";
import { client } from "@/src/graphql";
import { GET_WEBSITE_SETTINGS } from "@/src/graphql/queries/settings";
import { GET_CONTACT_DETAILS, GET_CONTACT_ARABIC_DETAILS, GET_HEADER_SOCIAL, GET_HOME_SOCIAL_MEDIA } from "@/src/graphql/queries/contact";

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

      // 1b) Fetch contact details: English and Arabic from their options pages
      let contactDataFromOptionsEn = null;
      let contactDataFromOptionsAr = null;
      try {
         const contactEnResponse = await client.query({
            query: GET_CONTACT_DETAILS,
            fetchPolicy: "no-cache",
         });
         let rawEn = contactEnResponse?.data?.contactInfoFieldsEnglish?.contactDetailsEnglishFields?.contactDetails ?? null;
         if (Array.isArray(rawEn) && rawEn.length > 0) rawEn = rawEn[0];
         contactDataFromOptionsEn = rawEn;
      } catch (_) {}
      try {
         const contactArResponse = await client.query({
            query: GET_CONTACT_ARABIC_DETAILS,
            fetchPolicy: "no-cache",
         });
         let rawAr = contactArResponse?.data?.contactInfoFieldsArabic?.contactDetailsArabicFields?.contactDetails ?? null;
         if (Array.isArray(rawAr) && rawAr.length > 0) rawAr = rawAr[0];
         contactDataFromOptionsAr = rawAr;
      } catch (_) {}
      const contactDataFromOptions = contactDataFromOptionsEn ?? contactDataFromOptionsAr;

      // 1c) Fetch header social: options first, then home page so all pages can show it
      let socialMediaFromOptions = [];
      try {
         const socialResponse = await client.query({
            query: GET_HEADER_SOCIAL,
            fetchPolicy: "no-cache",
         });
         const raw = socialResponse?.data?.contactInfoFieldsEnglish?.socialMedia;
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

      // 4) Merge websiteSettings, contact details (EN + AR), social, and SEO data into props; keep revalidate for ISR
      const merged = {
         props: {
            ...originalResult.props,
            websiteSettings: settingsResponse?.data ?? null,
            contactDataFromOptions: contactDataFromOptions,
            contactDataFromOptionsEn: contactDataFromOptionsEn,
            contactDataFromOptionsAr: contactDataFromOptionsAr,
            socialMediaFromOptions: socialMediaFromOptions,
            seo: seoData,
         },
      };
      if ("revalidate" in originalResult) merged.revalidate = originalResult.revalidate;
      return merged;
   };
}
