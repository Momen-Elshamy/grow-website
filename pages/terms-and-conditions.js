import MainLayout from "@/components/Layout/MainLayout";
import TermsAndConditions from "@/components/pages/terms-and-conditions/TermsAndConditions";
import { client } from "@/src/graphql";
import {
  GET_TERMS_AND_CONDITIONS_DATA,
  GET_TERMS_AND_CONDITIONS_DATA_ARABIC,
} from "@/src/graphql/queries/TermsandConditions";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function TermsAndConditionsPage({
  termsAndConditionsData,
  termsAndConditionsDataArabic,
}) {
  return (
    <TermsAndConditions
      termsAndConditionsData={termsAndConditionsData}
      termsAndConditionsDataArabic={termsAndConditionsDataArabic}
    />
  );
}

TermsAndConditionsPage.getLayout = function getLayout(page, pageProps) {
  const seo = pageProps?.seo ? { ...pageProps.seo } : {};

  if (!seo.head || !seo.head.includes('name="description"')) {
    seo.description = "Read our terms and conditions to understand the rules and guidelines for using Grow's services and website.";
  }
  const socialMediaData = pageProps?.socialMediaFromOptions ?? [];
  const contactDataEn = pageProps?.contactDataFromOptionsEn ?? null;
  const contactDataAr = pageProps?.contactDataFromOptionsAr ?? null;

  return (
    <MainLayout
      seo={seo}
      socialMediaData={socialMediaData}
      contactDataEn={contactDataEn}
      contactDataAr={contactDataAr}
    >
      {page}
    </MainLayout>
  );
};

export const getStaticProps = withWebsiteSettings(async () => {
  try {
    const [englishData, arabicData] = await Promise.all([
      client.query({
        query: GET_TERMS_AND_CONDITIONS_DATA,
        fetchPolicy: "no-cache",
      }),
      client.query({
        query: GET_TERMS_AND_CONDITIONS_DATA_ARABIC,
        fetchPolicy: "no-cache",
      }),
    ]);

    const termsAndConditionsData =
      englishData?.data?.nodeByUri?.termsAndConditionsFieldsEnglish?.termsAndConditionsEnglish ?? null;
    const termsAndConditionsDataArabic =
      arabicData?.data?.nodeByUri?.termsAndConditionsFieldsArabic?.termsAndConditions ?? null;

    return {
      props: {
        termsAndConditionsData: termsAndConditionsData
          ? JSON.parse(JSON.stringify(termsAndConditionsData))
          : null,
        termsAndConditionsDataArabic: termsAndConditionsDataArabic
          ? JSON.parse(JSON.stringify(termsAndConditionsDataArabic))
          : null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching terms and conditions data:", error);
    return {
      props: { termsAndConditionsData: null, termsAndConditionsDataArabic: null },
      revalidate: 1,
    };
  }
});
