import MainLayout from "@/components/Layout/MainLayout";
import Home from "@/components/pages/home/home";
export default function HomePage() {
   return <Home />;
}

HomePage.getLayout = function getLayout(page) {
   return <MainLayout>{page}</MainLayout>;
};
