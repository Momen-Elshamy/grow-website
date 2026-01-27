import React, { useMemo } from "react";
import { Typography } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import CustomButton from "../../UI/Button";
import styles from "./MissionSection.module.css";

const { Title, Paragraph } = Typography;

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const farmerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

export default function MissionLeftContent({ title, paragraph, imageSrc }) {
  const { currentLang } = useLanguage();
  const isRTL = currentLang === "ar";
  const t = useMemo(() => {
    const dict = currentLang === "ar" ? ar : en;
    return (key) => {
      const keys = key.split(".");
      let val = dict;
      for (const k of keys) {
        val = val?.[k];
      }
      return val ?? key;
    };
  }, [currentLang]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className={`${styles.darkGreenCard} ${isRTL ? styles.darkGreenCardRTL : ""}`}
    >
      {/* Image on left side for Arabic */}
      {isRTL && imageSrc && (
        <div className={styles.leftImageWrapper}>
          <Image
            src={imageSrc}
            alt="Mission Image"
            width={200}
            height={350}
            className={styles.leftImage}
            priority
          />
        </div>
      )}

      <div className={`${styles.contentWrapper} ${isRTL ? styles.contentWrapperRTL : ""}`}>
        <motion.div variants={itemVariants}>
          <Title level={2} className={styles.leftTitle}>
            {title}
          </Title>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Paragraph className={styles.leftParagraph}>{paragraph}</Paragraph>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CustomButton
            href="/contact"
            className={styles.contactButton}
            iconColor="#0b2414"
          >
            {t("homeButtons.contactUs")}
          </CustomButton>
        </motion.div>
      </div>

      {/* Farmer Image overlapping - only show in English */}
      {!isRTL && imageSrc && (
        <motion.div variants={farmerVariants} className={styles.farmerWrapper}>
          <Image
            src={imageSrc}
            alt="Farmer"
            width={200}
            height={350}
            className={styles.farmerImage}
            priority
          />
        </motion.div>
      )}
    </motion.div>
  );
}
