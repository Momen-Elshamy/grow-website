import ServicesPageContent from "@/components/pages/services/Services";
import { client } from "@/src/graphql";
import { GET_FRONT_PAGE_DATA } from "@/src/graphql/queries/services";
import MainLayout from "@/components/Layout/MainLayout";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function ServicesPage({ servicesPageData }) {
  return <ServicesPageContent servicesData={servicesPageData} />;
}

ServicesPage.getLayout = function getLayout(page, pageProps) {
  const seo = pageProps?.seo || null;
  return <MainLayout seo={seo}>{page}</MainLayout>;
};

export const getStaticProps = withWebsiteSettings(async () => {
  try {
    const { data } = await client.query({
      query: GET_FRONT_PAGE_DATA,
    });

    return {
      props: {
        servicesPageData: data?.nodeByUri?.servicesFields || null,
      },
      revalidate: 60, // optional ISR
    };
  } catch (error) {
    console.error("Error fetching services page data:", error);

    return {
      props: {
        servicesPageData: null,
        revalidate: 1,
      },
    };
  }
});
