import AboutHero from "./AboutHero";
import OurValues from "./OurValues";
import VisionAndMission from "./VisionAndMission";
import OurCompany from "./OurCompany";
import SuccessStories from "./SuccessStories";
import ExpertsSection from "./ExpertsSection";
import NewsletterSection from "./NewsletterSection";

export default function About({ aboutPageData }) {
  const heroData = aboutPageData?.hero;
  const ourCompanyData = aboutPageData?.ourCompany;
  const ourValuesData = aboutPageData?.ourValues;
  const successStoriesData = aboutPageData?.successStories;
  const visionAndMissionData = aboutPageData?.visionAndMission;
  const expertsData = aboutPageData?.meetOurExperts;
  const newsletterData = aboutPageData?.updatedSection;

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
