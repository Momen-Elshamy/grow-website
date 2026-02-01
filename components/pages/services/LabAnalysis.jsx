import { Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./LabAnalysis.module.css";
import Uicons from "@/components/UI/Uicons";

export default function LabAnalysis({ ourServicesData }) {
  const service = ourServicesData?.services?.[1];

  if (!service) return null;

  const { title, description, image, altImage, moreDescription, benefits } = service;
  return (
    <section id="lab" className={styles.labAnalysisSection}>
      <div className={styles.container}>
        <Row gutter={0} className={styles.row}>
          {/* Left Column: Image */}
          <Col xs={24} lg={12} className={styles.imageColumn}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.imageWrapper}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={image?.node?.sourceUrl}
                  alt={altImage}
                  fill
                  className={styles.farmerImage}
                />
              </div>
            </motion.div>
          </Col>

          {/* Right Column: Text Content */}
          <Col xs={24} lg={12} className={styles.textColumn}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.textContent}
            >

              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>
                {description}
              </p>
              <p className={styles.intro}>
                {moreDescription}
              </p>

              <div className={styles.iconBlocksContainer}>
                {benefits.map((benefit, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`${styles.iconBlock} ${styles[`iconBlock${index + 1}`]}`}
                  >
                    <Uicons
                      icon={benefit?.icon}
                      size="32px"
                      style={{
                        color: "#ffffff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <p className={styles.blockLabel}>{benefit?.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
