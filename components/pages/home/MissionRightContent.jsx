import React from "react";
import { Typography, Button } from "antd";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./MissionSection.module.css";

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

const MissionRightContent = ({ currentContent, handlePrev, handleNext }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className={styles.yellowCard}
    >
      <div className={styles.rightContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentContent.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Title level={4} className={styles.rightTitle}>
              {currentContent.title}
            </Title>
            <Paragraph className={styles.rightParagraph}>
              {currentContent.text}
            </Paragraph>
          </motion.div>
        </AnimatePresence>

        <div className={styles.navigation}>
          <Button
            icon={
              <Uicons icon="fi-rr-angle-left" size="16px" color="#0b2414" />
            }
            className={styles.navButton}
            onClick={handlePrev}
          />
          <Button
            icon={
              <Uicons icon="fi-rr-angle-right" size="16px" color="#0b2414" />
            }
            className={styles.navButton}
            onClick={handleNext}
          />
        </div>
      </div>

      {/* Leaf Graphic */}
      <motion.div variants={leafVariants} className={styles.leafGraphic}>
        <Image
          src="/images/hero/banner-1.png"
          alt="Leaf Graphic"
          width={160}
          height={120}
          className={styles.leafImage}
        />
      </motion.div>
    </motion.div>
  );
};

export default MissionRightContent;
