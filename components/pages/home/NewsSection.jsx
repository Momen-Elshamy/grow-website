import React, { useState } from "react";
import { Row, Col, Modal, Flex } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import CustomButton from "@/components/UI/Button";
import Uicons from "@/components/UI/Uicons";
import styles from "./NewsSection.module.css";

const COMMITMENT_DEFAULTS = {
  videoUrl:
    "https://www.youtube.com/embed/vDMwdqtipeI?feature=oembed&mode=opaque&loop=1&autoplay=1&controls=1&mute=0&rel=0&modestbranding=0",
  mainImage: "/images/news/banner-video.webp",
  tagline: "Insights, News, and Updates on Sustainable Agriculture.",
  heading:
    "Discover expert insights, industry news, and updates.",
  features: [
    {
      icon: "fi fi-rr-farm",
      title: "Always support farmers",
      description:
        "Farmers strength their soil health while increasing crop yields & profitability.",
    },
    {
      icon: "fi-rr-recycle",
      title: "Power of regeneration",
      description:
        "Shifting agriculture from being carbon emitter to a powerful carbon sink.",
    },
  ],
};

export default function NewsSection({
  videoUrl = COMMITMENT_DEFAULTS.videoUrl,
  mainImage = COMMITMENT_DEFAULTS.mainImage,
  tagline = COMMITMENT_DEFAULTS.tagline,
  heading = COMMITMENT_DEFAULTS.heading,
  features = COMMITMENT_DEFAULTS.features,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <Uicons icon="fi-rr-leaf" className={styles.taglineIcon} />
          <span>{tagline}</span>
        </motion.div>

        <motion.h2 className={styles.heading} variants={leftVariants}>
          {heading}
        </motion.h2>

        <Row gutter={[60, 40]}>
          <Col xs={24} lg={12}>
            <motion.div className={styles.imageWrapper} variants={leftVariants}>
              <div className={styles.mainImageContainer}>
                <Image
                  src={mainImage}
                  alt="Agriculture Technology"
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
                      <Uicons icon="fi-rr-wheat" size={32} color="#107634" />
                    </div>
                    <div className={styles.overlayContent}>
                      <h3>Agriculture & Foods</h3>
                    </div>
                  </Flex>
                  <div
                    className={styles.playButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Uicons icon="fi-rr-play" size={16} />
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
                Quality Crops
              </motion.div>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <div className={styles.content}>
              <motion.p
                className={styles.descriptionOne}
                variants={rightVariants}
              >
                We help farmers and consumers have the technologies they need to
                protect the crops and the ecosystems from the threat of pests,
                weeds diseases in an environmentally sound, safe, and
                sustainable way.
              </motion.p>
              <motion.p className={styles.description} variants={rightVariants}>
                With 65 years of experience, we utilize deep industry knowledge,
                insights and innovation expertise to create solutions for
                tomorrow.
              </motion.p>

              <div className={styles.features}>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={styles.featureItem}
                    variants={rightVariants}
                  >
                    <div className={styles.featureIcon}>
                      <Uicons icon={feature.icon} className={styles.icon} />
                    </div>
                    <div className={styles.featureText}>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className={styles.actions} variants={rightVariants}>
                <CustomButton
                  className={styles.btn}
                  icon="fi-rr-arrow-small-right"
                >
                  More About Us
                </CustomButton>
                <CustomButton
                  className={`${styles.btn} ${styles.secondaryBtn}`}
                  icon={null}
                >
                  Contact Us
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
            src={`${videoUrl}?autoplay=1`}
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
