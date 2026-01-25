import Solutions from "@/components/pages/solutions/Solutions";
import { client } from "@/src/graphql";
import { GET_FRONT_PAGE_DATA } from "@/src/graphql/queries/solutions";
import MainLayout from "@/components/Layout/MainLayout";
import { withWebsiteSettings } from "@/src/services/withWebsiteSettings";

export default function SolutionsPage({ solutionsPageData}) {
  return (
    <>
     <Solutions solutionsPageData={solutionsPageData} />
    </>
  );
}

SolutionsPage.getLayout = function getLayout(page, pageProps) {
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
        solutionsPageData: data?.nodeByUri?.solutionsFields || null,
      },
      revalidate: 60, // optional ISR
    };
  } catch (error) {
    console.error("Error fetching solutions page data:", error);

    return {
      props: {
        solutionsPageData: null,
        revalidate: 1, 
      },
    };
  }
});
