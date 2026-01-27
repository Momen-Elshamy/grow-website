import { gql } from "@apollo/client";

/** English contact from "Contact Info (English)" options page. GraphQL Type Name: ContactInfoFieldsEnglish */
export const GET_CONTACT_DETAILS = gql`
  query GetContactDetails {
    contactInfoFieldsEnglish {
      contactDetailsEnglishFields {
        contactDetails {
          title
          info {
            icon
            title
            info {
              value
              link
            }
            phoneNumbers {
              number
              link
            }
          }
        }
      }
    }
  }
`;

/** Arabic contact from "Contact Info (Arabic)" options page. contactDetailsArabicFields keeps it separate from English. */
export const GET_CONTACT_ARABIC_DETAILS = gql`
  query GetContactArabicDetails {
    contactInfoFieldsArabic {
      contactDetailsArabicFields {
        contactDetails {
          title
          info {
            icon
            title
            info {
              value
              link
            }
            phoneNumbers {
              number
              link
            }
          }
        }
      }
    }
  }
`;

export const GET_HEADER_SOCIAL = gql`
  query GetHeaderSocial {
    contactInfoFields {
      socialMedia {
        icon
        link
      }
    }
  }
`;

export const GET_HOME_SOCIAL_MEDIA = gql`
  query GetHomeSocialMedia {
    nodeByUri(uri: "/home") {
      ... on Page {
        homePageFields {
          socialMedia {
            icon
            link
          }
        }
      }
    }
  }
`;
