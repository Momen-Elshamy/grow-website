import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Optimization.module.css";
import CustomButton from "@/components/UI/Button";

export default function Optimization({ourServicesData}) {
  const service = ourServicesData?.services?.[4];

  if (!service) return null; 

  const { title, description, image, altImage, moreDescription } = service;
  return (
    <section id="optimization" className={styles.labAnalysisSection}>   
      <div className={styles.backgroundImageWrapper}>
        <Image
          src={image?.node?.sourceUrl}
          alt={altImage}
          fill
          priority
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textWrapper}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.title}
          >
           {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.description}
          >
         {description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.description}
          >
            {moreDescription}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
