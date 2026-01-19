import MainLayout from "@/components/Layout/MainLayout";
import Home from "@/components/pages/home/home";
import { client } from "@/src/graphql";
import { GET_FRONT_PAGE_DATA } from "@/src/graphql/queries/home";
export default function HomePage({ homePageData }) {
   return <Home homePageData={homePageData} />;
}

HomePage.getLayout = function getLayout(page, pageProps) {
   const socialMediaData = pageProps?.homePageData?.socialMedia;
   return <MainLayout socialMediaData={socialMediaData}>{page}</MainLayout>;
};

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: GET_FRONT_PAGE_DATA,
  });

  const homePageData = data?.nodeByUri?.homePageFields;
  return {
    props: { homePageData },
  };
};