import Image from "next/image";
import Uicons from "@/components/UI/Uicons";
import styles from "./InfoBox.module.css";

export default function InfoBox() {
  const features = [
    "100% Organic Products",
    "The Best Ingredients",
    "Cow Meat & Milk",
  ];

  return (
    <div className={styles.infoBox}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Image
          src="/images/Hero/logo1.png"
          alt="Logo"
          className={styles.logoImage}
          width={100}
          height={100}
        />
      </div>

      {/* Content */}
      <h2 className={styles.infoTitle}>
        Delivering Sustainable Agriculture Solutions!
      </h2>
      <p className={styles.infoDescription}>
        Techniques that prioritize health of our land and customers within the
        regional agricultural market.
      </p>

      {/* Features List */}
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <Uicons icon="fi-rr-check" size="20px" color="white" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Decorative Plant */}
      <div className={styles.plantDecoration}>
        <Image
          src="/images/Hero/banner1.png"
          alt="Plant decoration"
          width={140}
          height={100}
          className={styles.plantImage}
        />
      </div>
    </div>
  );
}
