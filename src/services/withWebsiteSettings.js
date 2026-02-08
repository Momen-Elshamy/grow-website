import axios from "axios";
import { client } from "@/src/graphql";
import { GET_WEBSITE_SETTINGS } from "@/src/graphql/queries/settings";
import { GET_CONTACT_DETAILS, GET_CONTACT_ARABIC_DETAILS, GET_HEADER_SOCIAL, GET_HOME_SOCIAL_MEDIA } from "@/src/graphql/queries/contact";

const WORDPRESS_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

function decodeHtmlEntities(str) {
   if (!str || typeof str !== "string") return str;
   return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

function extractTitleFromHead(headHTML) {
   if (!headHTML) return null;
   const m = headHTML.match(/<title[^>]*>([^<]+)<\/title>/i);
   if (m?.[1]) return decodeHtmlEntities(m[1].trim());
   const og = headHTML.match(/<meta[^>]*property\s*=\s*["']og:title["'][^>]*content\s*=\s*["']([^"']+)["']/i) || headHTML.match(/<meta[^>]*content\s*=\s*["']([^"']+)["'][^>]*property\s*=\s*["']og:title["']/i);
   return og?.[1] ? decodeHtmlEntities(og[1].trim()) : null;
}

async function fetchRankMathSEO(pageUrl) {
   try {
      const { data } = await axios.get(`${WORDPRESS_BASE_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(pageUrl)}`);
      const title = extractTitleFromHead(data?.head);
      return { success: data?.success, head: data?.head ?? null, title };
   } catch {
      return { success: false, head: null, title: null };
   }
}

/** withWebsiteSettings(gssp, { fallbackPath: "/" }) - fallbackPath used for Rank Math URL */
export function withWebsiteSettings(gssp, options = {}) {
   const path = options.fallbackPath ?? "/";
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

      // 2) Fetch SEO from Rank Math (fallbackPath must match WordPress URL exactly)
      const base = (WORDPRESS_BASE_URL || "").replace(/\/$/, "");
      let pageUrl = path === "/" ? `${base}/` : `${base}${path}/`;
      let seoData = await fetchRankMathSEO(pageUrl);
      // Homepage: / often returns incomplete title; try /home/ (WordPress static front page slug)
      if (path === "/" && (!seoData.title || seoData.title.endsWith(" | ") || seoData.title === "Grow Egypt |")) {
         const alt = await fetchRankMathSEO(`${base}/home/`);
         if (alt?.title && !alt.title.endsWith(" | ")) seoData = alt;
      }

      // 3) Call page's getStaticProps
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
