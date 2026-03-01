import { gql } from "@apollo/client";

export const GET_FRONT_PAGE_DATA = gql`
  query GETAGBPAGEDATA {
    nodeByUri(uri: "/about") {
      ... on Page {
        id
        title
        slug
        aboutFields {
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
          ourCompany {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
            decorativeText
            icon
            tagline
          }
          ourValues {
            title
            description
            valueItem {
              icon
              valueText
              description
            }
          }
          successStories {
            icon
            tagline
            storiesData {
              image {
                node {
                  sourceUrl
                }
              }
              altImage
              video
              title
              description
              heading
            }
          }
          visionAndMission {
            title
            description
            vissionDescription
            missionDescription
          }
          meetOurExperts {
            title
            description
            expertsData {
              image {
                node {
                  sourceUrl
                }
              }
              altImage
              video
              name
              description
              jobTitle
            }
          }
          updatedSection {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
            email
          }
        }
      }
    }
  }
`;

export const GET_FRONT_PAGE_ARABIC_DATA = gql`
  query GETAGBPAGEDATA {
    nodeByUri(uri: "/about-2") {
      ... on Page {
        id
        title
        slug
        aboutFields {
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
          ourCompany {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
            decorativeText
            icon
            tagline
          }
          ourValues {
            title
            description
            valueItem {
              icon
              valueText
              description
            }
          }
          successStories {
            icon
            tagline
            storiesData {
              image {
                node {
                  sourceUrl
                }
              }
              altImage
              video
              title
              description
              heading
            }
          }
          visionAndMission {
            title
            description
            vissionDescription
            missionDescription
          }
          meetOurExperts {
            title
            description
            expertsData {
              image {
                node {
                  sourceUrl
                }
              }
              altImage
              video
              name
              description
              jobTitle
            }
          }
          updatedSection {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
            email
          }
        }
      }
    }
  }
`;
