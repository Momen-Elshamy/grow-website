import MainLayout from "@/components/Layout/MainLayout";
import Home from "@/components/pages/home/home";
import { client } from "@/src/graphql";
import { GET_FRONT_PAGE_DATA } from "@/src/graphql/queries/home";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function HomePage({ homePageData }) {
   return <Home homePageData={homePageData} />;
}

HomePage.getLayout = function getLayout(page, pageProps) {
   // Extract data from pageProps
   const homePageFields = pageProps?.homePageData || {};
   const socialMediaData = homePageFields?.socialMedia || [];
   const contactData = homePageFields?.contactUs || null;
   const seo = pageProps?.seo || null;
   
   return <MainLayout socialMediaData={socialMediaData} contactData={contactData} seo={seo}>{page}</MainLayout>;
};

export const getStaticProps = withWebsiteSettings (
  async () => {
  const { data } = await client.query({
    query: GET_FRONT_PAGE_DATA,
  });

  const homePageData = data?.nodeByUri?.homePageFields ?? null;
  const safeHomePageData =
    homePageData === null ? null : JSON.parse(JSON.stringify(homePageData));
  return {
    props: { homePageData: safeHomePageData },
    revalidate: 1, // Revalidate as soon as possible (minimum valid value)
  };
});