import InfoHeader from "./InfoHeader";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "../UI/WhatsAppWidget";
import { Layout } from "antd";
import Head from "next/head";

export default function MainLayout({ children, socialMediaData, contactData, seo }) {
   return (
      <>
      <Head>
         {seo?.title && !seo?.head?.includes("<title>") && <title>{seo?.title}</title>}
         {seo?.head && !seo?.head?.includes("<meta") && <meta dangerouslySetInnerHTML={{ __html: seo?.head }} />}
      </Head>
      <Layout style={{ margin: "0 auto", background: "white"}}>
         <InfoHeader socialMediaData={socialMediaData} contactData={contactData} />
         <Header />
         <Layout.Content style={{ minHeight: "100vh" }}>{children}</Layout.Content>
         <Footer socialMediaData={socialMediaData} />
         <WhatsAppWidget />
      </Layout>
      </>
   );
}

