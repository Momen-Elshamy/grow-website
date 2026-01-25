import { gql } from "@apollo/client";

// Website settings query
export const GET_WEBSITE_SETTINGS = gql`
   query GetWebsiteSettings {
    websiteSettingsPage {
         websiteSettings {
          pageTitle
          metaDescription
          ogImage {
            node {
              altText
              sourceUrl
            }
          }
          canonicalUrl
          schemaJson
          customBodyScripts
          customHeadScripts
        }
    }
}
`;

