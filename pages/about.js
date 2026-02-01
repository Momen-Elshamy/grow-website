import MainLayout from "@/components/Layout/MainLayout";
import About from "@/components/pages/about/About";
import { client } from "@/src/graphql";
import {
  GET_FRONT_PAGE_DATA,
  GET_FRONT_PAGE_ARABIC_DATA,
} from "@/src/graphql/queries/about";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function AboutPage({ aboutPageData, aboutPageDataArabic }) {
  return (
    <About
      aboutPageData={aboutPageData}
      aboutPageDataArabic={aboutPageDataArabic}
    />
  );
}

AboutPage.getLayout = function getLayout(page, pageProps) {
  const aboutPageFields = pageProps?.aboutPageData || {};
  const socialMediaData = aboutPageFields?.socialMedia ?? pageProps?.socialMediaFromOptions ?? [];
  const contactDataEn = pageProps?.contactDataFromOptionsEn ?? null;
  const contactDataAr = pageProps?.contactDataFromOptionsAr ?? null;
  const seo = pageProps?.seo ? { ...pageProps.seo } : {};

  if (!seo.head || !seo.head.includes('name="description"')) {
    seo.description = "Learn more about Grow, our mission, vision, and the expert team dedicated to driving your business growth.";
  }

  return (
    <MainLayout socialMediaData={socialMediaData} contactDataEn={contactDataEn} contactDataAr={contactDataAr} seo={seo}>
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

    const aboutPageData = englishData?.data?.nodeByUri?.aboutFields || null;
    const aboutPageDataArabic = arabicData?.data?.nodeByUri?.aboutFields || null;

    return {
      props: {
        aboutPageData: aboutPageData
          ? JSON.parse(JSON.stringify(aboutPageData))
          : null,
        aboutPageDataArabic: aboutPageDataArabic
          ? JSON.parse(JSON.stringify(aboutPageDataArabic))
          : null,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return {
      props: { aboutPageData: null, aboutPageDataArabic: null },
      revalidate: 1,
    };
  }
});
