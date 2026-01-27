import MainLayout from "@/components/Layout/MainLayout";
import News from "@/components/pages/news/News";
import { client } from "@/src/graphql";
import {
  GET_NEWS_PAGE_DATA,
  GET_NEWS_PAGE_ARABIC_DATA,
} from "@/src/graphql/queries/news";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function NewsPage({
  newsPageData,
  newsPageDataArabic,
}) {
  return (
    <News
      newsPageData={newsPageData}
      newsPageDataArabic={newsPageDataArabic}
    />
  );
}

NewsPage.getLayout = function getLayout(page, pageProps) {
  const newsPageFields = pageProps?.newsPageData || {};
  const socialMediaData = newsPageFields?.socialMedia ?? pageProps?.socialMediaFromOptions ?? [];
  const contactData = pageProps?.contactDataFromOptions ?? newsPageFields?.contactUs ?? null;
  const seo = pageProps?.seo || null;

  return (
    <MainLayout socialMediaData={socialMediaData} contactData={contactData} seo={seo}>
      {page}
    </MainLayout>
  );
};

export const getStaticProps = withWebsiteSettings(async () => {
  try {
    const [englishData, arabicData] = await Promise.all([
      client.query({
        query: GET_NEWS_PAGE_DATA,
        fetchPolicy: "no-cache",
      }),
      client.query({
        query: GET_NEWS_PAGE_ARABIC_DATA,
        fetchPolicy: "no-cache",
      }),
    ]);

    const newsPageData = englishData?.data?.nodeByUri?.newsFields || null;
    const newsPageDataArabic = arabicData?.data?.nodeByUri?.newsFields || null;

    return {
      props: {
        newsPageData: newsPageData
          ? JSON.parse(JSON.stringify(newsPageData))
          : null,
        newsPageDataArabic: newsPageDataArabic
          ? JSON.parse(JSON.stringify(newsPageDataArabic))
          : null,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("Error fetching news page data:", error);
    return {
      props: {
        newsPageData: null,
        newsPageDataArabic: null,
      },
      revalidate: 1,
    };
  }
});
