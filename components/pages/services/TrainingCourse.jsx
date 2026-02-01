import { Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./TrainingCourse.module.css";
import Uicons from "@/components/UI/Uicons";


export default function TrainingCourse({ ourServicesData }) {
  const service = ourServicesData?.services?.[2];

  if (!service) return null;

  const { title, description, image, altImage, moreDescription, benefits } = service;
  return (
    <section id="training" className={styles.featuresSection}>
      <div className={styles.container}>
        <Row gutter={[60, 40]} align="middle">
          {/* Left Column: Farmer Image */}
          <Col xs={24} lg={12}>
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

          {/* Right Column: Features */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.sectionTitle}>{title}</h2>
              <p className={styles.sectionDescription}>
                {description}
              </p>
              {/* <p className={styles.sectionDescription}>{moreDescription}</p> */}
            </motion.div>
            <div className={styles.featuresList}>
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={benefit?.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={styles.featureItem}
                >
                  <div className={styles.iconWrapper}>
                    <Uicons
                      icon={benefit?.icon}
                      size="32px"
                      style={{
                        color: "#245631",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{benefit?.title}</h3>
                    <p className={styles.featureDescription}>
                      {benefit?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
