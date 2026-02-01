import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "antd";
import CustomButton from "@/components/UI/Button";
import styles from "./AboutHero.module.css";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useMemo } from "react";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

export default function AboutHero({ heroData }) {
  const { currentLang } = useLanguage();

  // Translation helper
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
    <section className={styles.heroSection}>
      <div className={styles.imageWrapper}>
          <Image
            src={heroData.image.node.sourceUrl}
            alt={heroData.altImage}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        <div className={styles.overlay} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textWrapper}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.title}
            >
              {heroData.title}
            </motion.h1>
        
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.description}
            >
              {heroData.description}
            </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.buttonGroup}
          >
            <Link href="/contact" passHref>
              <CustomButton className={styles.transparentBtn}>
                {t("aboutButtons.contactUs")}
              </CustomButton>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.breadcrumbWrapper}
        >
          <Breadcrumb
            className={styles.breadcrumb}
            separator={<span className={styles.separator}>&gt;</span>}
            items={[
              {
                title: <Link href="/">{t("aboutButtons.home")}</Link>,
              },
              {
                title: (
                  <span className={styles.current}>
                    {t("aboutButtons.aboutUs")}
                  </span>
                ),
              },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}
