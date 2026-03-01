import { Row, Col, Flex } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./FarmManagement.module.css";
import Uicons from "@/components/UI/Uicons";

export default function Management({ ourServicesData }) {
  const service = ourServicesData?.services?.[0];

  if (!service) return null;

  const { title, description, image, altImage, moreDescription, benefits } =
    service;

  return (
    <section id="management" className={styles.consultancySection}>
      <Row gutter={0} className={styles.row} align="middle">
        {/* Left Column */}
        <Col xs={24} lg={12} className={styles.textColumn}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.textContent}
            style={{
              contentVisibility: "auto",
              willChange: "transform, opacity",
            }}
            aria-label={title}
          >
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <br />
            <p className={styles.description}>{moreDescription}</p>

            <div className={styles.iconBlocksContainer}>
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${styles.iconBlock} ${
                    styles[`iconBlock${index + 1}`]
                  }`}
                  style={{
                    contentVisibility: "auto",
                    willChange: "transform, opacity",
                  }}
                >
                  <Uicons
                    icon={benefit?.icon}
                    size="18px"
                    style={{
                      color: "#ffffff",
                      display: "flex",
                      // justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <Flex vertical>
                    <h3 className={styles.blockLabel}>{benefit?.title}</h3>
                    <p className={styles.blockLabel}>{benefit?.description}</p>
                  </Flex>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={12} className={styles.imageColumn}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.imageWrapper}
            style={{
              contentVisibility: "auto",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={image?.node?.sourceUrl}
              alt={altImage || title}
              fill
              loading="lazy"
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.cropImage}
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </Col>
      </Row>
    </section>
  );
}
