import { useMemo } from "react";
import ServicesHero from "@/components/pages/services/ServicesHero";
import OurServices from "@/components/pages/services/OurServices";
import Training from "@/components/pages/services/Training";
import RemoteSensing from "@/components/pages/services/RemoteSensing";
import Management from "@/components/pages/services/FarmManagement";
import IrrigationSection from "@/components/pages/services/IrrigationSection";
import LabAnalysis from "@/components/pages/services/LabAnalysis";
import HeaderService from "@/components/pages/services/HeaderService";
import Consultancy from "@/components/pages/services/Consultancy";
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
      <ServicesHero heroData={hero} />
      <OurServices ourServicesData={ourServices} />
      <Management ourServicesData={ourServices} />
      <LabAnalysis ourServicesData={ourServices} />
      <Consultancy ourServicesData={ourServices} />
      <RemoteSensing ourServicesData={ourServices} />
      <Training ourServicesData={ourServices} />
      <IrrigationSection ourServicesData={ourServices} />
    </>
  );
}
