import { Row, Col } from "antd";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./VisionAndMission.module.css";

const missionItems = [
  {
    icon: "fi-rr-farm",
    title: "Always support farmer",
    description:
      "Farmers strength their soil health while increasing crop yields & profitability.",
  },
  {
    icon: "fi-rr-leaf",
    title: "Growing excellence",
    description:
      "Providing premium vegetable and soft fruit starter plants with our excellent seeds.",
  },
  {
    icon: "fi-rr-terrace",
    title: "Power of regeneration",
    description:
      "Shifting agriculture from being carbon emitter to a powerful carbon sink.",
  },
  {
    icon: "fi-rr-seedling",
    title: "Excellent seeds",
    description:
      "We help foster growth for our clients to contribute the agriculture industry's advancement.",
  },
  {
    icon: "fi-rr-tractor",
    title: "Years of heritage!",
    description:
      "Providing premium vegetable and soft fruit starter plants with our excellent seeds.",
  },
  {
    icon: "fi-rr-box-open",
    title: "Premium products",
    description:
      "Farmers strength their soil health while increasing crop yields & profitability.",
  },
  {
    icon: "fi-rr-apple-whole",
    title: "Fresh farm harvest",
    description:
      "We help foster growth for our clients to contribute the agriculture industry's advancement.",
  },
  {
    icon: "fi-rr-package",
    title: "Eco friendly packaging",
    description:
      "Shifting agriculture from being carbon emitter to a powerful carbon sink.",
  },
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function VisionAndMission() {
  return (
    <section id="mission" className={styles.visionMissionSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Vision & Mission</h2>
          <p className={styles.description}>
            Our commitment is to help farmers and consumers have the
            technologies they need to protect the crops and the ecosystems from
            the threat of pests.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Row className={styles.gridRow}>
            {missionItems.map((item, index) => (
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
                  <div className={styles.iconContainer}>
                    <Uicons
                      icon={item.icon}
                      size="32px"
                      color="#107634"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
}
