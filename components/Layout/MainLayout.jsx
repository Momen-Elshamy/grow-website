import InfoHeader from "./InfoHeader";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "../UI/WhatsAppWidget";
import { Layout } from "antd";
import Head from "next/head";

export default function MainLayout({ children, socialMediaData, contactDataEn, contactDataAr, seo }) {
   return (
      <>
         <Head>
            {seo?.title && <title>{seo.title}</title>}
            {seo?.description && <meta name="description" content={seo.description} />}      </Head>
         <Layout style={{ margin: "0 auto", background: "white" }}>
            <InfoHeader
               socialMediaData={socialMediaData}
               contactDataEn={contactDataEn}
               contactDataAr={contactDataAr}
            />
            <Header />          <Layout.Content style={{ minHeight: "100vh" }}>{children}</Layout.Content>
            <Footer socialMediaData={socialMediaData} />
            <WhatsAppWidget />
         </Layout>
      </>
   );
}

