import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import CustomButton from "@/components/UI/Button";
import styles from "./NewsCTA.module.css";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const bannerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function NewsCTA({ socialMediaData }) {
  const { currentLang } = useLanguage();
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

  const youtubeLink = socialMediaData?.youtube?.link || "#";

  const headline = t("newsCta.headline");
  const buttonLabel = t("newsCta.button");

  return (
    <motion.section
      className={styles.section}
      aria-label="Call to action"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div className={styles.banner} variants={bannerVariants}>
        <motion.h2 className={styles.headline} variants={itemVariants}>
          {headline}
        </motion.h2>
        <motion.span variants={itemVariants} className={styles.ctaButtonWrap}>
          <Link
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButtonLink}
            aria-label={buttonLabel}
          >
            <CustomButton className={styles.ctaButton} iconColor="#17311e">
              {buttonLabel}
            </CustomButton>
          </Link>
        </motion.span>
      </motion.div>
    </motion.section>
  );
}
