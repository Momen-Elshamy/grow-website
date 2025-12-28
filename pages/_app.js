// import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//    const getLayout = Component.getLayout || ((page) => page);
//    return getLayout(<Component {...pageProps} />);
// }

import "@/styles/globals.css";
import customTheme from "../theme.json";
import { ConfigProvider, theme } from "antd";
// import { ApolloProvider } from "@apollo/client";
// import { client } from "@/src/graphql";
function AppContent({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const page = (
    <>
      <Component {...pageProps} />
    </>
  );
  const layout =
    getLayout.length > 2 ? getLayout(page, pageProps) : getLayout(page);
  return (
    <ConfigProvider theme={{ ...customTheme, algorithm: theme.darkAlgorithm }}>
      {layout}
    </ConfigProvider>
  );
}
function App({ Component, pageProps }) {
  return (
    //  <ApolloProvider client={client}>
    <AppContent Component={Component} pageProps={pageProps} />
    //  </ApolloProvider>
  );
}
export default App;