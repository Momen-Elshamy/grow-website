import { motion } from "framer-motion";
import { Divider } from "antd";
import Link from "next/link";
import styles from "./ContactUs.module.css";
import Uicons from "@/components/UI/Uicons";
import {
  leftContentVariants,
  containerVariants,
  contactItemVariants,
  headingVariants,
} from "@/_data/contactUs/animations";

export default function ContactInfo() {
  return (
    <motion.div
      className={styles.leftContent}
      variants={leftContentVariants}
    >
      <motion.h2 className={styles.heading} variants={headingVariants}>
        If you have any questions or you'd like to find out more about
        our services, please get in touch!
      </motion.h2>

      <motion.div
        className={styles.contactInfo}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Quick Contact */}
        <motion.div
          className={styles.contactItem}
          variants={contactItemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className={styles.iconWrapper}>
            <Uicons icon="fi-rr-newsletter-subscribe" />
          </div>
          <div className={styles.contactDetails}>
            <h3 className={styles.contactTitle}>Quick Contact</h3>
            <Link
              href="mailto:info@grow-egypt.com"
              className={styles.contactText}
            >
              info@grow-egypt.com
            </Link>
            +201080200887
            <br />
            +20235380720
          </div>
        </motion.div>

        <Divider style={{ margin: "0" }} />

        {/* Our Location */}
        <motion.div
          className={styles.contactItem}
          variants={contactItemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className={styles.iconWrapper}>
            <Uicons icon="fi-rr-land-layer-location" />
          </div>
          <div className={styles.contactDetails}>
            <h3 className={styles.contactTitle}>Our Location</h3>
            <Link
              href="https://maps.google.com/?q=A105+LINX+building,+Smart+Village,+12577+Giza,+Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactText}
            >
              A105 LINX building, Smart Village
            </Link>
          </div>
        </motion.div>

        <Divider style={{ margin: "0" }} />

        {/* Working Hours */}
        <motion.div
          className={styles.contactItem}
          variants={contactItemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className={styles.iconWrapper}>
            <Uicons icon="fi-rr-clock" />
          </div>
          <div className={styles.contactDetails}>
            <h3 className={styles.contactTitle}>Working Hours</h3>
            <p className={styles.contactText}>
               Sunday to Thursday from 8am -4 pm
            </p>
          </div>
        </motion.div>
        <Divider style={{ margin: "0" }} />
        <motion.div
          className={styles.contactItem}
          variants={contactItemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className={styles.iconWrapper}>
            <Uicons icon="fi-rr-newsletter-subscribe" />
          </div>
          <div className={styles.contactDetails}>
            <h3 className={styles.contactTitle}>
              Recommendations / Complaints
            </h3>
            <p className={styles.contactText}>+20 109 917 1000</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

