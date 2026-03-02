import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Typography, Flex, Row, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import styles from "./SolutionCard.module.css";
import Uicons from "@/components/UI/Uicons";
import CustomButton from "@/components/UI/Button";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

const { Paragraph, Text } = Typography;

const contentVariants = {
  hidden: (isRTL) => ({ opacity: 0, x: isRTL ? 60 : -60 }),
  visible: { opacity: 1, x: 0 },
};

const imageVariants = {
  hidden: (isRTL) => ({ opacity: 0, x: isRTL ? -60 : 60 }),
  visible: { opacity: 1, x: 0 },
};

export default function Card({ solution, sectionId }) {
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
    <div className={styles.cardWrapper} id={sectionId}>
      <div className={styles.card}>
        <Row className={styles.cardRow}>
          <Col
            md={{ span: 24, order: 2 }}
            lg={{ span: 11, order: 1 }}
            className={styles.cardContent}
            dir="auto"
          >
            <motion.div
              custom={isRTL}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={contentVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <Flex
                vertical
                justify="space-between"
                style={{ width: "100%", height: "100%" }}
              >
                <div>
                  <h3 className={styles.cardTitle}>{solution?.title}</h3>
                  <Paragraph className={styles.cardDescription}>
                    {solution?.description}
                  </Paragraph>
                  <ul className={styles.featureList}>
                    {solution?.features?.map((feature, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.checkIcon}>
                          <Uicons
                            icon={feature.icon}
                            className={styles.checkmark}
                          />
                        </span>
                        <Text className={styles.featureText}>
                          {feature.textIcon}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
                <Flex
                  align="end"
                  justify="space-between"
                  gap={32}
                  style={{ width: "100%", position: "relative" }}
                >
                  <Link href="/contact" style={{ textDecoration: "none", paddingTop:'8px' }}>
                    <CustomButton>{t("aboutButtons.contactUs")}</CustomButton>
                  </Link>
                </Flex>
              </Flex>
            </motion.div>
          </Col>

          <Col
            md={{ span: 24, order: 1 }}
            lg={{ span: 13, order: 2 }}
            className={styles.cardImageContainer}
          >
            <motion.div
              custom={isRTL}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={imageVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={styles.inner}
            >
              {solution?.image && (
                <Image
                  src={solution.image}
                  alt={
                    solution?.altImage || solution?.title || "Solution image"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={styles.cardImage}
                />
              )}
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
