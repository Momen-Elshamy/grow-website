import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import styles from "./TermsAndConditions.module.css";

export default function TermsAndConditionsPage({
  termsAndConditionsData,
  termsAndConditionsDataArabic,
}) {
  const { currentLang } = useLanguage();

  const termsAndConditionsDataToUse = useMemo(() => {
    if (currentLang === "ar") {
      return termsAndConditionsDataArabic || termsAndConditionsData || null;
    }
    return termsAndConditionsData || null;
  }, [currentLang, termsAndConditionsData, termsAndConditionsDataArabic]);

  const title =
    termsAndConditionsDataToUse?.title ;
  const contentBlocks = termsAndConditionsDataToUse?.termsAndConditionsContent ?? [];
  const isRTL = currentLang === "ar";

  return (
    <main className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          {contentBlocks.length > 0 ? (
            <div className={styles.contentList} dir={isRTL ? "rtl" : "auto"}>
              {contentBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  className={styles.contentBlock}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {block?.description ? (
                    <div
                      className={styles.description}
                      dangerouslySetInnerHTML={{ __html: block.description }}
                    />
                  ) : null}
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
