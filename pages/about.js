import MainLayout from "@/components/Layout/MainLayout";
import About from "@/components/pages/about/About";
import { client } from "@/src/graphql";
import { GET_FRONT_PAGE_DATA } from "@/src/graphql/queries/about";

export default function AboutPage({ aboutPageData }) {
  return <About aboutPageData={aboutPageData} />;
}

AboutPage.getLayout = function getLayout(page, pageProps) {
  const aboutPageFields = pageProps?.aboutPageData || {};
  const socialMediaData = aboutPageFields?.socialMedia || [];
  const contactData = aboutPageFields?.contactUs || null;

  return (
    <MainLayout socialMediaData={socialMediaData} contactData={contactData}>
      {page}
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: GET_FRONT_PAGE_DATA,
    });

    const aboutPageData = data?.nodeByUri?.aboutFields || null;
    return {
      props: { aboutPageData },
    };
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return {
      props: { aboutPageData: null },
      revalidate: 1, 
    };
  }
};
