import { Row, Col } from "antd";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./OurValues.module.css";

const valuesItems = [
  "Highest quality seeds & plants",
  "Cutting edge biosecurity methods",
  "Pest management planning",
  "Improving energy efficiency",
  "Filtering, and recycling rainwater",
  "Solutions tailored to your needs",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function OurValues() {
  return (
    <section id="values" className={styles.ourValuesSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Our Values</h2>
          <p className={styles.heading}>
            Delivering impact with purpose and partnership!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Row gutter={[16, 16]} className={styles.valuesGrid}>
            {valuesItems.map((value, index) => (
              <Col key={index} xs={24} md={8}>
                <motion.div
                  variants={itemVariants}
                  className={styles.valueItem}
                >
                  <div className={styles.iconWrapper}>
                    <Uicons
                      icon="fi-rr-check-circle"
                      size="24px"
                      color="#107634"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                  <span className={styles.valueText}>{value}</span>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
}
