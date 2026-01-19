import Image from "next/image";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import styles from "./ContactUs.module.css";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { containerVariants } from "@/_data/contactUs/animations";

export default function ContactUs({ noBackground = false, contactData }) {

  return (
    <motion.section
      className={`${styles.contactSection} ${
        noBackground ? styles.noBackground : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {!noBackground && (
        <>
          <div className={styles.backgroundImageWrapper}>
            <Image
              src="/images/bg-contact.webp"
              alt="Contact background"
              fill
              className={styles.backgroundImage}
              priority
              quality={90}
            />
          </div>
          <div className={styles.overlay}></div>
        </>
      )}
      <div className={styles.container}>
        <Row gutter={[32, 32]}>
          {/* Left Column - Contact Information */}
          <Col md={24} lg={10}>
            <ContactInfo contactData={contactData} />
          </Col>

          {/* Right Column - Contact Form */}
          <Col md={24} lg={14}>
            <ContactForm />
          </Col>
        </Row>
      </div>
    </motion.section>
  );
}
