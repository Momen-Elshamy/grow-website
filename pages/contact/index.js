import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import ContactMap from "@/components/pages/contact/ContactMap";
import ContactUs from "@/components/pages/home/ContactUs";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { client, GET_FRONT_PAGE_DATA } from "@/src/graphql";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function ContactPage({ homePageData, contactDataFromOptionsEn, contactDataFromOptionsAr }) {
  const { currentLang } = useLanguage();
  const contactData =
    currentLang === "ar"
      ? (contactDataFromOptionsAr ?? contactDataFromOptionsEn)
      : (contactDataFromOptionsEn ?? contactDataFromOptionsAr);
  return (
    <>
      <ContactMap />
      <ContactUs noBackground={true} contactData={contactData} />
    </>
  );
}

ContactPage.getLayout = function getLayout(page, pageProps) {
  const homePageData = pageProps?.homePageData;
  const socialMediaData = homePageData?.socialMedia ?? pageProps?.socialMediaFromOptions ?? [];
  const contactDataEn = pageProps?.contactDataFromOptionsEn ?? null;
  const contactDataAr = pageProps?.contactDataFromOptionsAr ?? null;
  const seo = pageProps?.seo || null;

  return (
    <MainLayout
      homePageData={homePageData}
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
  const { data } = await client.query({
    query: GET_FRONT_PAGE_DATA,
  });
  const homePageData = data?.nodeByUri?.homePageFields ?? null;
  const safeHomePageData =
    homePageData === null ? null : JSON.parse(JSON.stringify(homePageData));
  return {
    props: { homePageData: safeHomePageData },
    revalidate: 1, 
  };
});