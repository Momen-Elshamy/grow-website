"use client";

import { Row, Col, Flex } from "antd";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./VisionAndMission.module.css";

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function VisionAndMission({ visionAndMissionData }) {
  if (!visionAndMissionData) return null;

  const {
    title,
    description,
    vissionDescription,
    missionDescription,
    titleVision,
    titleMission,
  } = visionAndMissionData || {};

  return (
    <section id="mission" className={styles.visionMissionSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </motion.div>

        {/* Grid Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div>
            <h3 className={styles.titleVision}>{titleVision}</h3>
            <p className={styles.itemDescription}>{vissionDescription}</p>
          </div>
          <div>
            <h3 className={styles.titleMission}>{titleMission}</h3>
            <p className={styles.itemDescription}>{missionDescription}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
