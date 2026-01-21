import ServicesHero from "@/components/pages/services/ServicesHero";
import OurServices from "@/components/pages/services/OurServices";
import TrainingCourse from "@/components/pages/services/TrainingCourse";
import Irrigation from "@/components/pages/services/Irrigation";
import TechnicalConsultancy from "@/components/pages/services/TechnicalConsultancy";
import RemoteSensing from "@/components/pages/services/RemoteSensing";
import LabAnalysis from "@/components/pages/services/LabAnalysis";
import HeaderService from "@/components/pages/services/HeaderService";
import Optimization from "@/components/pages/services/Optimization";

export default function ServicesPageContent({ servicesData }) {
  const { headerService, hero, ourServices } = servicesData || {};

  return (
    <>
      <HeaderService headerService={headerService} />
      <ServicesHero heroData={hero} />
      <OurServices ourServicesData={ourServices} />
      <TechnicalConsultancy ourServicesData={ourServices} />
      <TrainingCourse ourServicesData={ourServices} />
      <Optimization ourServicesData={ourServices} />
      <LabAnalysis ourServicesData={ourServices} />
      <Irrigation ourServicesData={ourServices} />
      <RemoteSensing ourServicesData={ourServices} />
    </>
  );
}
