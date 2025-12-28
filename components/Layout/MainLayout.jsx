import Header from "./Header";
import Footer from "./Footer";
import { Layout } from "antd";
export default function MainLayout({ children }) {
   return (
      <Layout style={{ margin: '0 auto'}}>
         <Header />
         <Layout.Content>{children}</Layout.Content>
         <Footer />
      </Layout>
   );
}
