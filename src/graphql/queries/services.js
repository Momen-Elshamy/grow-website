import { gql } from "@apollo/client";

export const GET_FRONT_PAGE_DATA = gql`
  query GETAGBPAGEDATA {
    nodeByUri(uri: "/services") {
      ... on Page {
        id
        title
        slug
        servicesFields {
          headerService {
            title
            slug
          }
          hero {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
          }
          ourServices {
            title
            services {
              title
              description
              image {
                node {
                  sourceUrl
                }
              }
              altImage
              moreDescription
              benefits {
                title
                description
                icon
              }
            }
          }
        }
      }
    }
  }
`;


export const GET_FRONT_PAGE_ARABIC_DATA = gql`
  query GET_SERVICES_PAGE_ARABIC {
    nodeByUri(uri: "/services-2") {
      ... on Page {
        id
        title
        slug
        servicesFields {
          headerService {
            title
            slug
          }
          hero {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
          }
          ourServices {
            title
            services {
              title
              description
              image {
                node {
                  sourceUrl
                }
              }
              altImage
              moreDescription
              benefits {
                title
                description
                icon
              }
            }
          }
        }
      }
    }
  }
`;