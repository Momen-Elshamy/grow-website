import MainLayout from "@/components/Layout/MainLayout";
import News from "@/components/pages/news/News";
import { client } from "@/src/graphql";
import { GET_NEWS_PAGE_DATA } from "@/src/graphql/queries/news";

export default function NewsPage({ newsPageData }) {
  return <News newsPageData={newsPageData} />;
}

NewsPage.getLayout = function getLayout(page, pageProps) {
  const newsPageFields = pageProps?.newsPageData || {};
  const socialMediaData = newsPageFields?.socialMedia || [];
  const contactData = newsPageFields?.contactUs || null;

  return (
    <MainLayout socialMediaData={socialMediaData} contactData={contactData}>
      {page}
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: GET_NEWS_PAGE_DATA,
    });

    const newsPageData = data?.nodeByUri?.newsFields || null;
    return {
      props: { newsPageData },
    };
  } catch (error) {
    console.error("Error fetching news page data:", error);
    return {
      props: { newsPageData: null },
      revalidate: 1, 
    };
  }
};
