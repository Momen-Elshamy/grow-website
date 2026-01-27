import React, { useMemo } from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "../../UI/Button";
import Uicons from "../../UI/Uicons";
import styles from "./OurCompany.module.css";
import Marquee from "react-fast-marquee";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

export default function OurCompany({ ourCompanyData }) {
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

  if (!ourCompanyData) return null;

  const { title, description, image, decorativeText, icon, tagline } = ourCompanyData || {};
  const brandName = t("ourCompany.brandName");
  /* More items when Arabic so multiple "جرو مصر" are visible; always use enough for a long strip */
  const marqueeCount = currentLang === "ar" ? 25 : 12;
  const marqueeData = Array.from({ length: marqueeCount }, () => ({
    text: brandName,
    icon: "fi-rr-leaf",
  }));
  return (
    <section id="company" className={styles.ourCompanySection}>
      <div className={styles.container}>
        <Row gutter={[60, 40]} align="middle">
          {/* Left Side: Image with decorative text */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.imageWrapper}
            >
              <div className={styles.mainImageContainer}>
                <Image
                  src={image?.node?.sourceUrl}
                  alt={image?.node?.altText}
                  width={600}
                  height={600}
                  className={styles.mainImage}
                />
              </div>
              <div
                className={`${styles.decorativeText} ${
                  currentLang === "ar" ? styles.decorativeTextAr : ""
                }`}
              >
                {decorativeText}
              </div>
            </motion.div>
          </Col>

          {/* Right Side: Content */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.contentWrapper}
            >
              <div className={styles.tagline}>
                <Uicons icon={icon} size="20px" color="#366C45" />
                <span>{tagline}</span>
              </div>

              <h2 className={styles.heading}>
                {title}
              </h2>

              <p className={styles.description}>
                {description}
              </p>

              <div className={styles.buttonGroup}>
                <CustomButton href="#experts">
                  {t("aboutButtons.meetOurExperts")}
                </CustomButton>
              </div>

              {/* Marquee Section — in Arabic: dir="ltr" so it works, direction="right" for RTL scroll */}
              <div className={styles.marqueeWrapper} dir="ltr">
                <Marquee
                  key={currentLang}
                  gradient={false}
                  speed={40}
                  direction={currentLang === "ar" ? "right" : "left"}
                >
                  {marqueeData.map((item, index) => (
                    <div key={index} className={styles.marqueeItem}>
                      <span
                        className={`${styles.marqueeText} ${
                          currentLang === "ar" ? styles.marqueeTextRTL : ""
                        }`}
                      >
                        {item.text}
                      </span>
                      <div className={styles.marqueeIcon}>
                        <Uicons
                          icon={item.icon}
                          size="40px"
                          color="#e5efe9"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
