import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Typography, Flex, Row, Col } from "antd";
import Image from "next/image";
import styles from "./SolutionCard.module.css";
import Uicons from "@/components/UI/Uicons";
import CustomButton from "@/components/UI/Button";
import { scrollToSection } from "@/utils/scroll";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

const { Paragraph, Text } = Typography;

export default function Card({ solution, index, progress, range, targetScale }) {
  const container = useRef(null);
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
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardWrapper} id={solution?.id}>
      <motion.div
        style={{
          scale,
          top: `calc(-10% + ${index * 25}px)`,
          transformOrigin: "top center",
        }}
        className={styles.card}
      >
        <Row className={styles.cardRow}>
          <Col
            xs={{ span: 24, order: 2 }}
            md={{ span: 11, order: 1 }}
            className={styles.cardContent}
            dir="auto"
          >
            <Flex
              vertical
              justify="space-between"
              style={{ width: "100%", height: "100%" }}
            >
              <div>
                <h3 className={styles.cardTitle}>
                  {solution?.title}
                </h3>
                <Paragraph className={styles.cardDescription}>
                  {solution?.description}
                </Paragraph>
                <ul className={styles.featureList}>
                  {solution?.features?.map((feature, i) => (
                    <li key={i} className={styles.featureItem}>
                      <span className={styles.checkIcon}>
                        <Uicons 
                          icon={feature.icon || "fi-rr-check"} 
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
                <CustomButton onClick={() => scrollToSection("contact")}>
                  {t("aboutButtons.contactUs")}
                </CustomButton>

                <div
                  className={`${styles.cardNumber} ${
                    currentLang === "ar" ? styles.cardNumberRTL : ""
                  }`}
                >
                  {solution?.number}
                </div>
              </Flex>
            </Flex>
          </Col>

          <Col
            xs={{ span: 24, order: 1 }}
            md={{ span: 13, order: 2 }}
            className={styles.cardImageContainer}
          >
            <motion.div
              className={styles.inner}
              style={{ scale: imageScale, width: "100%", height: "100%" }}
            >
              {solution?.image && (
                <Image
                  src={solution.image}
                  alt={solution?.altImage || solution?.title || "Solution image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={styles.cardImage}
                />
              )}
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
}





