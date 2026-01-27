import { useMemo } from "react";
import AboutHero from "./AboutHero";
import OurValues from "./OurValues";
import VisionAndMission from "./VisionAndMission";
import OurCompany from "./OurCompany";
import SuccessStories from "./SuccessStories";
import ExpertsSection from "./ExpertsSection";
import NewsletterSection from "./NewsletterSection";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function About({ aboutPageData, aboutPageDataArabic }) {
  const { currentLang } = useLanguage();
  const aboutPageDataToUse = useMemo(() => {
    if (currentLang === "ar") {
      return aboutPageDataArabic || aboutPageData || null;
    }
    return aboutPageData || null;
  }, [currentLang, aboutPageData, aboutPageDataArabic]);

  const heroData = aboutPageDataToUse?.hero;
  const ourCompanyData = aboutPageDataToUse?.ourCompany;
  const ourValuesData = aboutPageDataToUse?.ourValues;
  const successStoriesData = aboutPageDataToUse?.successStories;
  const visionAndMissionData = aboutPageDataToUse?.visionAndMission;
  const expertsData = aboutPageDataToUse?.meetOurExperts;
  const newsletterData = aboutPageDataToUse?.updatedSection;

  return (
    <main>
      <AboutHero heroData={heroData} />
      <OurCompany ourCompanyData={ourCompanyData} />
      <OurValues ourValuesData={ourValuesData} />
      <SuccessStories successStoriesData={successStoriesData} />
      <VisionAndMission visionAndMissionData={visionAndMissionData} />
      <ExpertsSection expertsData={expertsData} />
      <NewsletterSection newsletterData={newsletterData} />
    </main>
  );
}
