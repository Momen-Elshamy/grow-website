import ServicesPageContent from "@/components/pages/services/Services";
import { client } from "@/src/graphql";
import {
  GET_FRONT_PAGE_DATA,
  GET_FRONT_PAGE_ARABIC_DATA,
} from "@/src/graphql/queries/services";
import MainLayout from "@/components/Layout/MainLayout";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function ServicesPage({
  servicesPageData,
  servicesPageDataArabic,
}) {
  return (
    <ServicesPageContent
      servicesPageData={servicesPageData}
      servicesPageDataArabic={servicesPageDataArabic}
    />
  );
}

ServicesPage.getLayout = function getLayout(page, pageProps) {
  const seo = pageProps?.seo || null;
  const socialMediaData = pageProps?.socialMediaFromOptions ?? [];
  const contactData = pageProps?.contactDataFromOptions ?? null;
  return <MainLayout seo={seo} socialMediaData={socialMediaData} contactData={contactData}>{page}</MainLayout>;
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

    const servicesPageData =
      englishData?.data?.nodeByUri?.servicesFields || null;
    const servicesPageDataArabic =
      arabicData?.data?.nodeByUri?.servicesFields || null;

    return {
      props: {
        servicesPageData: servicesPageData
          ? JSON.parse(JSON.stringify(servicesPageData))
          : null,
        servicesPageDataArabic: servicesPageDataArabic
          ? JSON.parse(JSON.stringify(servicesPageDataArabic))
          : null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching services page data:", error);
    return {
      props: {
        servicesPageData: null,
        servicesPageDataArabic: null,
      },
      revalidate: 1,
    };
  }
});
