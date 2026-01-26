import Hero from "./Hero";
import MissionSection from "./MissionSection";
import NewsSection from "./NewsSection";
import SuccessStories from "./SuccessStories";
import SolutionsSection from "./SolutionsSection";
import ContactUs from "./ContactUs";
import ServicesSection from "./ServicesSection";

export default function Home({ homePageData }) {
  const heroData = homePageData?.hero;
  const infoboxData = homePageData?.infobox;
  const newsData = homePageData?.newsSection;
  const solutionsData = homePageData?.solutionsSection;
  const servicesData = homePageData?.services;
  const missionData = homePageData?.missionAndVision;
  const successStoriesData = homePageData?.successStories;
  const contactData = homePageData?.contactUs;
  const socialMediaData = homePageData?.socialMedia;

  return (
    <>
        <Hero heroData={heroData} infoboxData={infoboxData} />
        <NewsSection newsData={newsData} />
        <ServicesSection servicesData={servicesData} />
        <SolutionsSection solutionsData={solutionsData} />
        <MissionSection missionData={missionData} />
        <SuccessStories successStoriesData={successStoriesData} />
        <ContactUs
          contactData={contactData}
          socialMediaData={socialMediaData}
        />
    </>
  );
}
