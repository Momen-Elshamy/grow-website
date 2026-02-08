import Solutions from "@/components/pages/solutions/Solutions";
import { client } from "@/src/graphql";
import {
  GET_FRONT_PAGE_DATA,
  GET_FRONT_PAGE_ARABIC_DATA,
} from "@/src/graphql/queries/solutions";
import MainLayout from "@/components/Layout/MainLayout";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function SolutionsPage({
  solutionsPageData,
  solutionsPageDataArabic,
}) {
  return (
    <Solutions
      solutionsPageData={solutionsPageData}
      solutionsPageDataArabic={solutionsPageDataArabic}
    />
  );
}

SolutionsPage.getLayout = function getLayout(page, pageProps) {
  const seo = pageProps?.seo ? { ...pageProps.seo } : {};

  if (!seo.head || !seo.head.includes('name="description"')) {
    seo.description = "Discover our innovative solutions tailored to meet the unique challenges of your industry and business.";
  }
  const socialMediaData = pageProps?.socialMediaFromOptions ?? [];
  const contactDataEn = pageProps?.contactDataFromOptionsEn ?? null;
  const contactDataAr = pageProps?.contactDataFromOptionsAr ?? null;
  return (
    <MainLayout seo={seo} socialMediaData={socialMediaData} contactDataEn={contactDataEn} contactDataAr={contactDataAr}>
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

    const solutionsPageData =
      englishData?.data?.nodeByUri?.solutionsFields || null;
    const solutionsPageDataArabic =
      arabicData?.data?.nodeByUri?.solutionsFields || null;

    return {
      props: {
        solutionsPageData: solutionsPageData
          ? JSON.parse(JSON.stringify(solutionsPageData))
          : null,
        solutionsPageDataArabic: solutionsPageDataArabic
          ? JSON.parse(JSON.stringify(solutionsPageDataArabic))
          : null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching solutions page data:", error);
    return {
      props: {
        solutionsPageData: null,
        solutionsPageDataArabic: null,
      },
      revalidate: 1,
    };
  }
}, { fallbackPath: "/solutions" });
