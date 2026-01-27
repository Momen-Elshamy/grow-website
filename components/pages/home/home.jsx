import { useLanguage } from "@/src/contexts/LanguageContext";
import { useMemo } from "react";
import Hero from "./Hero";
import MissionSection from "./MissionSection";
import NewsSection from "./NewsSection";
import SuccessStories from "./SuccessStories";
import SolutionsSection from "./SolutionsSection";
import ContactUs from "./ContactUs";
import ServicesSection from "./ServicesSection";

export default function Home({ homePageData, homePageDataArabic }) {
  const { currentLang } = useLanguage();
  
  // Select data based on current language
  const homePageDataToUse = useMemo(() => {
    if (currentLang === "ar") {
      return homePageDataArabic || null;
    }
    return homePageData || null;
  }, [currentLang, homePageData, homePageDataArabic]);

  const heroData = homePageDataToUse?.hero;
  const infoboxData = homePageDataToUse?.infobox;
  const newsData = homePageDataToUse?.newsSection;
  const solutionsData = homePageDataToUse?.solutionsSection;
  const servicesData = homePageDataToUse?.services;
  const missionData = homePageDataToUse?.missionAndVision;
  const successStoriesData = homePageDataToUse?.successStories;
  const contactData = homePageDataToUse?.contactUs;
  const socialMediaData = homePageDataToUse?.socialMedia;

  // Show message if no data available for selected language
  if (!homePageDataToUse) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>No {currentLang === "ar" ? "Arabic" : "English"} content available.</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
        <Hero key={`hero-${currentLang}`} heroData={heroData} infoboxData={infoboxData} />
        <NewsSection newsData={newsData} />
        <ServicesSection servicesData={servicesData} />
        <SolutionsSection solutionsData={solutionsData} />
        <MissionSection missionData={missionData} />
        <SuccessStories successStoriesData={successStoriesData} />
        <ContactUs
          contactData={contactData}
          socialMediaData={socialMediaData}
        />
    </div>
  );
}
