import Hero from "./Hero";
import MissionSection from "./MissionSection";
import NewsSection from "./NewsSection";
import Services from "./Services";
import SolutionsSection from "./SolutionsSection";
import ContactUs from "./ContactUs";

export default function Home() {
  return (
    <>
        <Hero />
        <NewsSection />
        <Services />
        <SolutionsSection />
        <MissionSection />
        <ContactUs />
    </>
  );
}
