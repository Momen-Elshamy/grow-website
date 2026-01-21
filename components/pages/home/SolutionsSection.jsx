import { motion } from "framer-motion";
import Uicons from "@/components/UI/Uicons";
import styles from "./Solutions.module.css";
import SolutionsCarousel from "./SolutionsCarousel";

export default function SolutionsSection({ solutionsData }) {
  const { subtitle, title, solutionscarousel } = solutionsData || {};

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundImage} />
        <div className={styles.backgroundOverlay} />
      </div>
      <div className={styles.servicesWrapper}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.headerSection}
        >
          <p className={styles.subtitle}>{subtitle}</p>
          <h2 className={styles.mainTitle}>{title}</h2>
          <div className={styles.leafIconContainer}>
            <Uicons icon="fi-rr-leaf" size="20px" color="#107634" />
            <Uicons
              icon="fi-rr-leaf"
              size="20px"
              color="#107634"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </motion.div>

        <SolutionsCarousel solutionscarousel={solutionscarousel} />
      </div>
    </div>
  );
}
