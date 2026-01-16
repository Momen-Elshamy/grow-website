import React from "react";
import { Typography } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "../../UI/Button";
import styles from "./MissionSection.module.css";

const { Title, Paragraph } = Typography;

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const farmerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

export default function MissionLeftContent({ title, paragraph, imageSrc }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className={styles.darkGreenCard}
    >
      <div className={styles.contentWrapper}>
        <motion.div variants={itemVariants}>
          <Title level={2} className={styles.leftTitle}>
            {title}
          </Title>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Paragraph className={styles.leftParagraph}>{paragraph}</Paragraph>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CustomButton
            href="/contact"
            className={styles.contactButton}
            iconColor="#0b2414"
          >
            Contact Us
          </CustomButton>
        </motion.div>
      </div>

      {/* Farmer Image overlapping */}
      <motion.div variants={farmerVariants} className={styles.farmerWrapper}>
        <Image
          src={imageSrc}
          alt="Farmer"
          width={200}
          height={300}
          className={styles.farmerImage}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
