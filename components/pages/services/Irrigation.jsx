import { Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Irrigation.module.css";
import Uicons from "@/components/UI/Uicons";

export default function Irrigation({ourServicesData}) {
  const service = ourServicesData?.services?.[3];

  if (!service) return null;

  const { title, description, image, altImage , moreDescription,benefits} = service;

  return (
    <section id="irrigation" className={styles.irrigationSection}>
      <div className={styles.container}>
        <Row gutter={[60, 40]} align="middle">
          {/* Left Column: Text Content */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.textContent}
            >
              <h2 className={styles.mainTitle}>
              {title}
              </h2>
              <p className={styles.paragraph}>
               {description}
              </p>
              <p className={styles.paragraph}>
              {moreDescription}
              </p>
             
            </motion.div>
          </Col>

          {/* Right Column: Image with Overlay Card */}
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
                  alt={altImage}
                  fill
                  className={styles.farmerImage}
                />
                {/* Yellow Overlay Card */}
                <div className={styles.overlayCard}>
                  <div className={styles.cardIconSection}>
                    <Uicons
                      icon={benefits[0]?.icon}
                      size="32px"
                      style={{
                        color: "#107634",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                  <div className={styles.cardTextSection}>
                    <p className={styles.cardText}>
                      {benefits[0]?.description}  
                    </p>
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
