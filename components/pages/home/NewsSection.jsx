import React, { useState, useMemo } from "react";
import { Row, Col, Modal, Flex } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import CustomButton from "@/components/UI/Button";
import Uicons from "@/components/UI/Uicons";
import styles from "./NewsSection.module.css";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default function NewsSection({ newsData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const { video, image, taglineicon, title, categoryTitle, features, description, decorativeText, icon } = newsData || {};

  const embedUrl = getYouTubeEmbedUrl(video);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className={styles.tagline} variants={leftVariants}>
          <Uicons icon={icon} className={styles.taglineIcon} />
          <span>{taglineicon}</span>
        </motion.div>

        <motion.h2 className={styles.heading} variants={leftVariants}>
          {title}
        </motion.h2>

        <Row gutter={[60, 40]}>
          <Col xs={24} lg={12}>
            <motion.div className={styles.imageWrapper} variants={leftVariants}>
              <div className={styles.mainImageContainer}>
                <Image
                  src={image?.node?.sourceUrl}
                  alt={image?.node?.altText}
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  className={styles.mainImage}
                  priority
                />
                <motion.div
                  className={styles.overlayCard}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Flex vertical justify="center" align="center">
                    <div className={styles.overlayIconBox}>
                      <Uicons icon={icon} size={32} color="#245631" />
                    </div>
                    <div className={styles.overlayContent}>
                      <h3>{categoryTitle}</h3>
                    </div>
                  </Flex>
                  <div
                    className={styles.playButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span
                      className={
                        currentLang === "ar" ? styles.playIconRTL : undefined
                      }
                    >
                      <Uicons icon="fi-rr-play" size={16} />
                    </span>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className={styles.decorativeText}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {decorativeText}
              </motion.div>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <div className={styles.content}>
              {description && (
                <motion.p
                  className={styles.descriptionOne}
                  variants={rightVariants}
                >
                  {description}
                </motion.p>
              )}

              <div className={styles.features}>
                {features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={styles.featureItem}
                    variants={rightVariants}
                  >
                    <div className={styles.featureIcon}>
                      <Uicons icon={feature?.icon} className={styles.icon} />
                    </div>
                    <div className={styles.featureText}>
                      <h4>{feature?.title}</h4>
                      <p>{feature?.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className={styles.actions} variants={rightVariants}>
                <CustomButton
                  className={styles.btn}
                  href="/about"
                >
                  {t("homeButtons.moreAboutUs")}
                </CustomButton>
                <CustomButton
                  href="/contact"
                  className={`${styles.btn} ${styles.secondaryBtn}`}
                  icon={null}
                >
                  {t("homeButtons.contactUs")}
                </CustomButton>
              </motion.div>
            </div>
          </Col>
        </Row>
      </motion.div>

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1100}
        centered
        destroyOnClose
        bodyStyle={{ padding: 0, backgroundColor: "transparent" }}
        className={styles.videoModal}
      >
        <div className={styles.videoResponsive}>
          <iframe
            width="100%"
            height="100%"
            src={`${embedUrl}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </section>
  );
}
