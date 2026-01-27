import { useMemo } from "react";
import SolutionsHero from "./Hero";
import CommitmentSection from "./CommitmentSection";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function Solutions({
  solutionsPageData,
  solutionsPageDataArabic,
}) {
  const { currentLang } = useLanguage();
  const solutionsPageDataToUse = useMemo(() => {
    if (currentLang === "ar") {
      return solutionsPageDataArabic || solutionsPageData || null;
    }
    return solutionsPageData || null;
  }, [currentLang, solutionsPageData, solutionsPageDataArabic]);

  return (
    <>
      <SolutionsHero heroData={solutionsPageDataToUse?.hero} />
      <CommitmentSection
        solutionsSection={solutionsPageDataToUse?.solutionsSection}
        solutionCardsData={solutionsPageDataToUse?.solutionCards}
      />
    </>
  );
}