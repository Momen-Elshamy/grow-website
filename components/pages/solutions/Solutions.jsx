import SolutionsHero from "./Hero";
import CommitmentSection from "./CommitmentSection";

export default function Solutions({ solutionsPageData }) {
  return (
    <>
      <SolutionsHero heroData={solutionsPageData?.hero} />
      <CommitmentSection 
        solutionsSection={solutionsPageData?.solutionsSection}
        solutionCardsData={solutionsPageData?.solutionCards}
      />
    </>
  );
}