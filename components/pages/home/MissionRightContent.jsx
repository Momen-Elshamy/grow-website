import React, { useMemo, useCallback } from "react";
import { Typography, Button, Flex } from "antd";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Uicons from "../../UI/Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import styles from "./MissionSection.module.css";
import CustomButton from "@/components/UI/Button";
import { scrollToSection, scrollToSectionAfterNavigate } from "@/utils/scroll";

const { Title, Paragraph } = Typography;

const containerVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const leafVariants = {
  hidden: { opacity: 0, rotate: -45, scale: 0.5 },
  visible: {
    opacity: 0.6,
    rotate: 0,
    scale: 1,
    transition: { delay: 0.5, duration: 0.8, ease: "easeOut" },
  },
};

export default function MissionRightContent({
  currentContent,
  handlePrev,
  handleNext,
}) {
  const router = useRouter();
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

  const handleSeeMore = useCallback(
    (e) => {
      e.preventDefault();
      const path = "/about";
      const sectionId = "mission";

      if (typeof window !== "undefined" && router.pathname === path) {
        scrollToSection(sectionId, 80);
      } else {
        router
          .push(`${path}#${sectionId}`, undefined, { scroll: false })
          .then(() => scrollToSectionAfterNavigate(sectionId));
      }
    },
    [router],
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className={`${styles.yellowCard} ${isRTL ? styles.yellowCardRTL : ""}`}
    >
      <div className={styles.rightContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentContent?.id}
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 30 : -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Title level={3} className={styles.rightTitle}>
              {currentContent?.title}
            </Title>
            <Paragraph className={styles.rightParagraph}>
              {currentContent?.description}
            </Paragraph>
            <Flex justify="end">
              <CustomButton
                className={styles.seeMore}
                // icon={null}
                href="/about#mission"
                onClick={handleSeeMore}
                iconColor="#17311E"
              >
                {t("readMore")}
              </CustomButton>
            </Flex>
          </motion.div>
        </AnimatePresence>

        <div className={`${styles.navigation}`}>
          <Button
            icon={
              <Uicons
                icon={isRTL ? "fi-rr-angle-right" : "fi-rr-angle-left"}
                size="16px"
                color="#0b2414"
              />
            }
            className={styles.navButton}
            onClick={handlePrev}
            aria-label={isRTL ? t("carousel.next") : t("carousel.prev")}
          />
          <Button
            icon={
              <Uicons
                icon={isRTL ? "fi-rr-angle-left" : "fi-rr-angle-right"}
                size="16px"
                color="#0b2414"
              />
            }
            className={styles.navButton}
            onClick={handleNext}
            aria-label={isRTL ? t("carousel.prev") : t("carousel.next")}
          />
        </div>
      </div>

      {/* Leaf Graphic — position and mirror for RTL */}
      <motion.div
        variants={leafVariants}
        className={`${styles.leafGraphic} ${isRTL ? styles.leafGraphicRTL : ""}`}
      >
        <Image
          src="/images/hero/banner-1.png"
          alt="Leaf Graphic"
          width={168}
          height={120}
          className={styles.leafImage}
        />
      </motion.div>
    </motion.div>
  );
}
