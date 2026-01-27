import { gql } from "@apollo/client";

export const GET_CONTACT_DETAILS = gql`
  query GetContactDetails {
    contactInfoFields {
      contactDetailsFields {
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
