import InfoHeader from "./InfoHeader";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "../UI/WhatsAppWidget";
import { Layout } from "antd";

export default function MainLayout({ children, socialMediaData }) {

   return (
      <Layout style={{ margin: "0 auto", background: "white" }}>
         <InfoHeader socialMediaData={socialMediaData} />
         <Header />
         <Layout.Content style={{ minHeight: "100vh" }}>{children}</Layout.Content>
         <Footer socialMediaData={socialMediaData} />
         <WhatsAppWidget />
      </Layout>
   );
}

