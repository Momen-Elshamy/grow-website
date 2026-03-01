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
  socialMediaData,
  socialMediaFromOptions,
}) {
  const socialMedia = socialMediaData || socialMediaFromOptions || [];
  return (
    <News
      newsPageData={newsPageData}
      newsPageDataArabic={newsPageDataArabic}
      socialMediaData={socialMedia}
    />
  );
}

NewsPage.getLayout = function getLayout(page, pageProps) {
  const newsPageFields = pageProps?.newsPageData || {};
  const socialMediaData = newsPageFields?.socialMedia ?? pageProps?.socialMediaFromOptions ?? [];
  const contactDataEn = pageProps?.contactDataFromOptionsEn ?? null;
  const contactDataAr = pageProps?.contactDataFromOptionsAr ?? null;
  const seo = pageProps?.seo ? { ...pageProps.seo } : {};

  if (!seo.head || !seo.head.includes('name="description"')) {
    seo.description = "Stay updated with the latest news, updates, and insights from Grow. Explore our latest articles, featured videos, and community updates.";
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

    // Extract social media data from either page
    const socialMediaData = newsPageData?.socialMedia || newsPageDataArabic?.socialMedia || null;

    return {
      props: {
        newsPageData: newsPageData
          ? JSON.parse(JSON.stringify(newsPageData))
          : null,
        newsPageDataArabic: newsPageDataArabic
          ? JSON.parse(JSON.stringify(newsPageDataArabic))
          : null,
        socialMediaData: socialMediaData ?? null,
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
}, { fallbackPath: "/news" });
