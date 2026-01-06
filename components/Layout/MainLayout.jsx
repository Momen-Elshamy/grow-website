import Header from "./Header";
import Footer from "./Footer";
import { Layout } from "antd";
export default function MainLayout({ children }) {
   return (
      <Layout style={{ margin: "0 auto", background: "white" }}>
         <Header />
         <Layout.Content style={{ minHeight: "100vh", paddingTop: "80px" }}>{children}</Layout.Content>
         <Footer />
      </Layout>
   );
}
