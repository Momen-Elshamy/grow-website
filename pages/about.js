import MainLayout from "@/components/Layout/MainLayout";
import About from "@/components/pages/about/About";

export default function AboutPage() {
  return <About />;
}

AboutPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

