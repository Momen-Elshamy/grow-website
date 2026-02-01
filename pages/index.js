import MainLayout from "@/components/Layout/MainLayout";
import Home from "@/components/pages/home/home";
import { client } from "@/src/graphql";
import { GET_FRONT_PAGE_DATA, GET_FRONT_PAGE_ARABIC_DATA } from "@/src/graphql/queries/home";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function HomePage({ homePageData, homePageDataArabic, contactDataFromOptionsEn, contactDataFromOptionsAr }) {
  return (
    <Home
      homePageData={homePageData}
      homePageDataArabic={homePageDataArabic}
      contactDataFromOptionsEn={contactDataFromOptionsEn}
      contactDataFromOptionsAr={contactDataFromOptionsAr}
    />
  );
}

HomePage.getLayout = function getLayout(page, pageProps) {
  const homePageFields = pageProps?.homePageData || {};
  const socialMediaData = homePageFields?.socialMedia ?? pageProps?.socialMediaFromOptions ?? [];
  const contactDataEn = pageProps?.contactDataFromOptionsEn ?? null;
  const contactDataAr = pageProps?.contactDataFromOptionsAr ?? null;
  const seo = pageProps?.seo ? { ...pageProps.seo } : {};

  if (!seo.head || !seo.head.includes('name="description"')) {
    seo.description = "Grow is your partner for digital growth, offering data-driven solutions and innovative strategies in the Middle East.";
  }

  return (
    <MainLayout
      socialMediaData={socialMediaData}
      contactDataEn={contactDataEn}
      contactDataAr={contactDataAr}
      seo={seo}
    >
      {page}
    </MainLayout>
  );
};

export const getStaticProps = withWebsiteSettings(async () => {
  try {
    const [englishData, arabicData] = await Promise.all([
      client.query({
        query: GET_FRONT_PAGE_DATA,
        fetchPolicy: "no-cache",
      }),
      client.query({
        query: GET_FRONT_PAGE_ARABIC_DATA,
        fetchPolicy: "no-cache",
      }),
    ]);

    return {
      props: {
        homePageData: englishData?.data?.nodeByUri?.homePageFields
          ? JSON.parse(JSON.stringify(englishData.data.nodeByUri.homePageFields))
          : null,
        homePageDataArabic: arabicData?.data?.nodeByUri?.homePageFields
          ? JSON.parse(JSON.stringify(arabicData.data.nodeByUri.homePageFields))
          : null,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("[getStaticProps] Error fetching home page data:", error);
    return {
      props: {
        homePageData: null,
        homePageDataArabic: null,
      },
      revalidate: 1,
    };
  }
});