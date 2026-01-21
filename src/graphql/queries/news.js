import { gql } from "@apollo/client";

export const GET_NEWS_PAGE_DATA = gql`
 query GET_NEWS_PAGE_DATA {
  nodeByUri(uri: "/news") {
    ... on Page {
      id
      title
      slug
      newsFields {
        hero {
          title
          description
          image {
            node {
              altText
              sourceUrl
            }
          }
        }
          newsFields {
            news {
              news {
                title
                description
                relatedImages {
                  image {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                }
                readMoreDescription
                date
                tags {
                  label
                }
            }
          }
        }
        featureVideo {
          video
          title
          description
          featureImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
}
`;