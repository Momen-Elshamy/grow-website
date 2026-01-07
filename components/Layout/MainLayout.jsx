import InfoHeader from "./InfoHeader";
import Header from "./Header";
import Footer from "./Footer";
import { Layout } from "antd";
export default function MainLayout({ children }) {
   return (
      <Layout style={{ margin: "0 auto", background: "white" }}>
         <InfoHeader />
         <Header />
         <Layout.Content style={{ minHeight: "100vh", paddingTop: "160px" }}>{children}</Layout.Content>
         <Footer />
      </Layout>
   );
}