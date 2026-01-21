import { gql } from "@apollo/client";

export const GET_FRONT_PAGE_DATA = gql`
  query GETAGBPAGEDATA {
    nodeByUri(uri: "/home") {
      ... on Page {
        id
        title
        slug
        homePageFields {
          hero {
            heroDetails {
              title
              description
              image {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
          infobox {
            title
            description
            features {
              icon
              feature
            }
          }
          newsSection {
            icon
            taglineicon
            title
            image {
              node {
                altText
                sourceUrl
              }
            }
            categoryTitle
            video
            decorativetext
            description
            features {
              title
              icon
              description
            }
          }
          services {
            icon
            subtitle
            title
            steps {
              title
              description
            }
            image {
              node {
                altText
                sourceUrl
              }
            }
            icon
            overlaytext
          }
          solutionsSection {
            subtitle
            title
            solutionscarousel {
              image {
                node {
                  altText
                  sourceUrl
                }
              }
              title
              description
            }
          }
          missionAndVision {
            title
            description
            image {
              node {
                altText
                sourceUrl
              }
            }
            currentcontent {
              title
              description
            }
          }
          successStories {
            title
            subtitle
            cards {
              image {
                node {
                  altText
                  sourceUrl
                }
              }
              title
              description
              contenttag {
                title
              }
            }
          }
          contactUs {
            title
            info {
              icon
              title
              info {
                value
                number
                link
              }
            }
          }
          socialMedia {
            icon
            link
          }
        }
      }
    }
  }
`;
