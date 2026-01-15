import AboutHero from "./AboutHero";
import OurValues from "./OurValues";
import VisionAndMission from "./VisionAndMission";
import OurCompany from "./OurCompany";
import SuccessStories from "./SuccessStories";
import ExpertsSection from "./ExpertsSection";
import NewsletterSection from "./NewsletterSection";

export default function About() {
  return (
    <main>
      <AboutHero />
      <OurCompany />
      <OurValues />
      <SuccessStories />
      <VisionAndMission />
      <ExpertsSection />
      <NewsletterSection />
      {/* Other sections of the about page will go here */}
    </main>
  );
}
