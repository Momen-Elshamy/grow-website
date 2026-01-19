import Image from "next/image";
import { motion } from "framer-motion";
import Uicons from "@/components/UI/Uicons";
import styles from "./InfoBox.module.css";

export default function InfoBox({ infoboxData }) {

  const {title, description, features} = infoboxData;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ y: "-50%" }}
      className={styles.infoBox}
    >
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Image
          src="/images/hero/logo1.png"
          alt="Logo"
          className={styles.logoImage}
          width={100}
          height={100}
        />
      </div>

      {/* Content */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.infoTitle}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={styles.infoDescription}
      >
        {description}
      </motion.p>

      {/* Features List */}
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className={styles.featureItem}
          >
            <Uicons icon={feature?.icon} size="20px" color="white" />
            <span>{feature?.feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Decorative Plant */}
      <div className={styles.plantDecoration}>
        <Image
          src="/images/hero/banner-1.png"
          alt="Plant decoration"
          width={140}
          height={100}
          className={styles.plantImage}
        />
      </div>
    </motion.div>
  );
}
