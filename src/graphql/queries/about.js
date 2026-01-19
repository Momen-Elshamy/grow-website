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
            missionItems {
              icon
              title
              description
            }
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
