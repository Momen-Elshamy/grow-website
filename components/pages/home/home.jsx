import Hero from "./Hero";
import MissionSection from "./MissionSection";
import NewsSection from "./NewsSection";
import Courses from "./Courses";
import Services from "./Services";
import SolutionsSection from "./SolutionsSection";
import ContactUs from "./ContactUs";


export default function Home() {
  return (
    <>
        <Hero />
        <NewsSection />
        <SolutionsSection />
        <Services />
        <MissionSection />
        <Courses />
        <ContactUs />
    </>
  );
}
