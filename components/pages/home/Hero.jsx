import CarouselComponent from "./HeroCarousel";
import InfoBox from "./InfoBox";
import styles from "./Hero.module.css";

export default function Hero({ heroData, infoboxData }) {
  const heroDetails = heroData?.heroDetails;
  return (
    <div className={styles.heroWrapper}>
      <CarouselComponent heroDetails={heroDetails} />
      <InfoBox infoboxData={infoboxData} />
    </div>
  );
}
