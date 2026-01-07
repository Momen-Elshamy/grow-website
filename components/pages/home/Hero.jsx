import CarouselComponent from "./HeroCarousel";
import InfoBox from "./InfoBox";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.heroWrapper}>
      <CarouselComponent />
      <InfoBox />
    </div>
  );
}
