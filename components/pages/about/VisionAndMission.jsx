"use client";

import { Row, Col } from "antd";
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

  const { title, description, missionItems = [] } = visionAndMissionData || {};

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
          <Row className={styles.gridRow} >
            {missionItems?.map((item, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                className={styles.gridCol}
              >
                <motion.div
                  variants={itemVariants}
                  className={styles.itemWrapper}
                >
                  {item.icon && (
                    <div className={styles.iconContainer}>
                      <Uicons
                        icon={item.icon}
                        size="32px"
                        color="#17311E"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </div>
                  )}
                  {item.title && (
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                  )}
                  {item.description && (
                    <p className={styles.itemDescription}>{item.description}</p>
                  )}
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
}
