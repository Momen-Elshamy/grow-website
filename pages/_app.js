import "@/styles/globals.css";
import "antd/dist/reset.css";
import MainLayout from "@/components/Layout/MainLayout";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/src/graphql";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ConfigProvider, theme } from "antd";
import customTheme from "../theme.json";

export default function App({ Component, pageProps }) {
   const router = useRouter();

   // Scroll to top on route change
   useEffect(() => {
      const handleRouteChange = () => {
         window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      };

      // Scroll to top on route changes
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
         router.events.off("routeChangeComplete", handleRouteChange);
      };
   }, [router.events]);

   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout || ((page, props) => {
      return <MainLayout>{page}</MainLayout>;
   });

   // Pass pageProps to getLayout so it can access server-side data (seo, websiteSettings, etc.)
   return (
      <ApolloProvider client={client}>
         <ConfigProvider theme={{ ...customTheme, algorithm: theme.darkAlgorithm }}>
            {getLayout(<Component {...pageProps} />, pageProps)}
         </ConfigProvider>
      </ApolloProvider>
   );
}
