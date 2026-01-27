import { gql } from "@apollo/client";

export const GET_FRONT_PAGE_DATA = gql`
  query GETAGBPAGEDATA {
    nodeByUri(uri: "/solutions") {
      ... on Page {
        id
        title
        slug
        solutionsFields {
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
          solutionsSection {
            title
            description
            icon
            subtitle
          }
          solutionCards{
           title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
            iconSection{
              icon
              textIcon
              }
          }
        }
      }
    }
  }
`;

export const GET_FRONT_PAGE_ARABIC_DATA = gql`
  query GET_SOLUTIONS_PAGE_ARABIC {
    nodeByUri(uri: "/solutions-2") {
      ... on Page {
        id
        title
        slug
        solutionsFields {
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
          solutionsSection {
            title
            description
            icon
            subtitle
          }
          solutionCards {
            title
            description
            image {
              node {
                sourceUrl
              }
            }
            altImage
            iconSection {
              icon
              textIcon
            }
          }
        }
      }
    }
  }
`;
