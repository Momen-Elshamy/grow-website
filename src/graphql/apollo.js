import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

// Create HTTP link
const graphqlEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

if (!graphqlEndpoint) {
   console.error("WORDPRESS_GRAPHQL_ENDPOINT is not configured. Please set it in your .env file.");
}

const httpLink = createHttpLink({
   uri: graphqlEndpoint || "https://grow-wordpress-2a16da-72-61-111-171.traefik.me/graphql",
});

// Create auth link
const authLink = setContext((_, { headers }) => {
   const authHeader = process.env.WORDPRESS_AUTH_HEADER;

   return {
      headers: {
         ...headers,
         ...(authHeader && { authorization: authHeader }),
      },
   };
});

// Helper function to convert HTTP to HTTPS URLs
const toHttps = (url) => {
   if (typeof url === 'string') {
      return url.replace(/^http:/, 'https:');
   }
   return url;
};

// Create cache with pagination policies
const cache = new InMemoryCache({
   typePolicies: {
      RootQuery: {
         fields: {
            posts: relayStylePagination(),
            pages: relayStylePagination(),
            // Add other post types as needed
            // customPostType: relayStylePagination(),
         },
      },
      // Handle custom post types
      Post: {
         fields: {
            // Add any specific field policies for Post type
         },
      },
      Page: {
         fields: {
            // Add any specific field policies for Page type
         },
      },
      // MediaItem: {
      //    fields: {
      //       sourceUrl: {
      //          read(existing) {
      //             return toHttps(existing);
      //          },
      //       },
      //    },
      // },
      // Handle ACF Media fields
      AcfMediaField: {
         fields: {
            sourceUrl: {
               read(existing) {
                  return toHttps(existing);
               },
            },
         },
      },
      // Handle any Media field
      MediaDetails: {
         fields: {
            sourceUrl: {
               read(existing) {
                  return toHttps(existing);
               },
            },
         },
      },
   },
});

// Create Apollo Client with no-cache fetchPolicy to completely prevent caching
// no-cache bypasses the cache entirely, unlike network-only which still writes to cache
const client = new ApolloClient({
   link: from([authLink, httpLink]),
   cache,
   ssrMode: typeof window === "undefined",
   defaultOptions: {
      watchQuery: {
         fetchPolicy: 'no-cache', // Completely bypass cache, don't read or write
         errorPolicy: "all",
      },
      query: {
         fetchPolicy: 'no-cache', // Completely bypass cache, don't read or write
         errorPolicy: "all",
      },
   },
});

export default client;
