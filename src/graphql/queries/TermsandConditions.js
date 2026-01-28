import { gql } from "@apollo/client";

export const GET_TERMS_AND_CONDITIONS_DATA = gql`
  query GET_TERMS_AND_CONDITIONS_DATA {
    nodeByUri(uri: "/terms-and-conditions") {
      ... on Page {
        termsAndConditionsFieldsEnglish {
          termsAndConditionsEnglish {
            title
            termsAndConditionsContent {
              description
            }
          }
        }
      }
    }
  }
`;

export const GET_TERMS_AND_CONDITIONS_DATA_ARABIC = gql`
  query GETAGBPAGEDATA {
    nodeByUri(uri: "/terms-and-conditions-2") {
      ... on Page {
        termsAndConditionsFieldsArabic {
          termsAndConditions {
            title
            termsAndConditionsContent {
              description
            }
          }
        }
      }
    }
  }
`;
