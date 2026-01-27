import { useMemo } from "react";
import ServicesHero from "@/components/pages/services/ServicesHero";
import OurServices from "@/components/pages/services/OurServices";
import TrainingCourse from "@/components/pages/services/TrainingCourse";
import Irrigation from "@/components/pages/services/Irrigation";
import TechnicalConsultancy from "@/components/pages/services/TechnicalConsultancy";
import RemoteSensing from "@/components/pages/services/RemoteSensing";
import LabAnalysis from "@/components/pages/services/LabAnalysis";
import HeaderService from "@/components/pages/services/HeaderService";
import Optimization from "@/components/pages/services/Optimization";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function ServicesPageContent({
  servicesPageData,
  servicesPageDataArabic,
}) {
  const { currentLang } = useLanguage();
  const servicesDataToUse = useMemo(() => {
    if (currentLang === "ar") {
      return servicesPageDataArabic || servicesPageData || null;
    }
    return servicesPageData || null;
  }, [currentLang, servicesPageData, servicesPageDataArabic]);

  const { headerService, hero, ourServices } = servicesDataToUse || {};

  return (
    <>
      <HeaderService headerService={headerService} />
      <div style={{ overflowX: "hidden", width: "100%" }}>
      <ServicesHero heroData={hero} />
      <OurServices ourServicesData={ourServices} />
      <TechnicalConsultancy ourServicesData={ourServices} />
      <TrainingCourse ourServicesData={ourServices} />
      <Optimization ourServicesData={ourServices} />
      <LabAnalysis ourServicesData={ourServices} />
      <Irrigation ourServicesData={ourServices} />
      <RemoteSensing ourServicesData={ourServices} />
      </div>
    </>
  );
}
