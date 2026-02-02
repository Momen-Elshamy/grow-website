import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "antd";
import CustomButton from "@/components/UI/Button";
import styles from "./ServicesHero.module.css";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useMemo } from "react";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

export default function ServicesHero({ heroData }) {
  const { currentLang } = useLanguage();
  const t = useMemo(() => {
    const dict = currentLang === "ar" ? ar : en;
    return (key) => {
      const keys = key.split(".");
      let val = dict;
      for (const k of keys) val = val?.[k];
      return val ?? key;
    };
  }, [currentLang]);

  const { title, description, image, altImage } = heroData || {};
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.imageWrapper}>
        <Image
          src={image.node.sourceUrl}
          alt={altImage || title}
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.heroImage}
          style={{ objectFit: "cover", objectPosition: "center" }}
          fetchPriority="high"
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
            style={{
              contentVisibility: "auto",
              willChange: "transform, opacity",
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.description}
            style={{
              contentVisibility: "auto",
              willChange: "transform, opacity",
            }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.buttonGroup}
          >
            <Link href="/contact" className={styles.contactBtnLink}>
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
                title: (
                  <Link rel="prefetch" href="/">
                    {t("aboutButtons.home")}
                  </Link>
                ),
              },
              {
                title: <span className={styles.current}>{t("services")}</span>,
              },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}
