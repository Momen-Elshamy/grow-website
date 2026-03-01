import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Training.module.css";
import { Row, Col, Flex } from "antd";

export default function Training({ ourServicesData }) {
  const service = ourServicesData?.services?.[4];

  if (!service) return null;

  const { title, description, image, altImage, moreDescription, benefits } =
    service || {};
  return (
    <section id="training" className={styles.labAnalysisSection}>
      <div className={styles.backgroundImageWrapper}>
        <Image
          src={image?.node?.sourceUrl}
          alt={altImage || title}
          fill
          loading="lazy"
          quality={85}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.backgroundImage}
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textWrapper}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.title}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.description}
          >
            {description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.description}
          >
            {moreDescription}
          </motion.p>

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
                  size="20px"
                  style={{
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
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
        </div>
      </div>
    </section>
  );
}
