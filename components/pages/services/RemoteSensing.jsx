import { Row, Col, Flex } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./RemoteSensing.module.css";
import Uicons from "@/components/UI/Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function RemoteSensing({ ourServicesData }) {
  const { currentLang } = useLanguage();
  const isRTL = currentLang === "ar";
  const service = ourServicesData?.services?.[3];

  if (!service) return null;

  const { title, description, image, altImage, moreDescription, benefits } =
    service;

  return (
    <section id="remote-sensing" className={styles.irrigationSection}>
      <div className={styles.container}>
        <Row gutter={[60, 40]} align="middle">
          {/* Left: Text */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.textContent}
            >
              <h2 className={styles.mainTitle}>{title}</h2>
              <p className={styles.paragraph}>{description}</p>
              <p className={styles.paragraph}>{moreDescription}</p>
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
                    <div className={styles.checkIcon}>
                      <Uicons
                        icon={benefit?.icon}
                        size="18px"
                        style={{
                          color: "black",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </div>
                    <Flex vertical>
                      <h3
                        className={styles.blockLabel}
                        style={{ fontWeight: "700" }}
                      >
                        {benefit?.title}
                      </h3>
                      <p className={styles.blockLabel}>
                        {benefit?.description}
                      </p>
                    </Flex>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Right: Image with Overlay Card */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.imageWrapper}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={image?.node?.sourceUrl}
                  alt={altImage || title}
                  fill
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.farmerImage}
                  style={{ objectFit: "cover" }}
                />

                {/* Overlay Card */}
                <div
                  className={`${styles.overlayCard} ${
                    isRTL ? styles.overlayCardLeft : ""
                  }`}
                  dir={isRTL ? "ltr" : undefined}
                >
                  <div className={styles.cardIconSection}>
                    <Uicons
                      icon={benefits[0]?.icon}
                      size="32px"
                      style={{
                        color: "#366C45",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                  <div
                    className={`${styles.cardTextSection} ${
                      isRTL ? styles.cardTextSectionRTL : ""
                    }`}
                  >
                    <h3 className={styles.cardText}>{benefits?.[0]?.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
