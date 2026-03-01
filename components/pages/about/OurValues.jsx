"use client";

import { Row, Col } from "antd";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./OurValues.module.css";

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function OurValues({ ourValuesData }) {
  if (!ourValuesData) return null;

  const { title, description, valueItem = [] } = ourValuesData || {};

  return (
    <section id="values" className={styles.ourValuesSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{title}</h2>
           <p className={styles.heading}>{description}</p>
        </motion.div>

        {/* Values Grid */}
         <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Row className={styles.gridRow} >
            {valueItem?.map((value, index) => (
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
                  {value.icon && (
                    <div className={styles.iconContainer}>
                      <Uicons
                        icon={value.icon}
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
                  {value.valueText && (
                    <h3 className={styles.itemTitle}>{value.valueText}</h3>
                  )}
                  {value.description && (
                    <p className={styles.itemDescription}>{value.description}</p>
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
