import Hero from "./Hero";
import MissionSection from "./MissionSection";
import NewsSection from "./NewsSection";
import Services from "./Services";
import SolutionsSection from "./SolutionsSection";

export default function Home() {
  return (
    <>
        <Hero />
        <NewsSection />
        <Services />
        <SolutionsSection />
        <MissionSection />
    </>
  );
}
