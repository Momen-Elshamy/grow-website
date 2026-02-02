import { Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./TechnicalConsultancy.module.css";

export default function TechnicalConsultancy({ ourServicesData }) {

  const service = ourServicesData?.services?.[0];

  if (!service) return null;

  const { title, description, image, altImage, moreDescription } = service;

  return (
    <section id="consultancy" className={styles.consultancySection}>
      <Row gutter={0} className={styles.row} align="middle">
        {/* Left Column */}
        <Col xs={24} lg={12} className={styles.textColumn}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.textContent}
            style={{ contentVisibility: "auto", willChange: "transform, opacity" }}
            aria-label={title}
          >
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <br />
            <p className={styles.description}>{moreDescription}</p>
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
            style={{ contentVisibility: "auto", willChange: "transform, opacity" }}
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
