import React from "react";
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

export default function ContactInfo({ contactData }) {

  const { title, info } = contactData || {};

  return (
    <motion.div
      className={styles.leftContent}
      variants={leftContentVariants}
    >
      <motion.h2 className={styles.heading} variants={headingVariants}>
        {title}
      </motion.h2>

      <motion.div
        className={styles.contactInfo}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {info?.map((item, index) => (
          <React.Fragment key={index}>
            <motion.div
              className={styles.contactItem}
              variants={contactItemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className={styles.iconWrapper}>
                <Uicons icon={item?.icon} />
              </div>
              <div className={styles.contactDetails}>
                <h3 className={styles.contactTitle}>{item?.title}</h3>
                {item?.info?.map((infoItem, infoIndex) => {
                  const hasValue = infoItem.value;
                  const hasNumber = infoItem.number;
                  const valueLink = infoItem.valueLink || infoItem.link;
                  const numberLink = infoItem.numberLink || infoItem.link;
                  
                  if (!hasValue && !hasNumber) return null;
                  
                  return (
                    <div key={infoIndex}>
                      {hasValue && (
                        <div>
                          {valueLink ? (
                            <Link
                              href={valueLink}
                              target={valueLink.startsWith("http") ? "_blank" : undefined}
                              rel={valueLink.startsWith("http") ? "noopener noreferrer" : undefined}
                              className={styles.contactText}
                            >
                              {infoItem.value}
                            </Link>
                          ) : (
                            <p className={styles.contactText}>{infoItem.value}</p>
                          )}
                        </div>
                      )}
                      {hasNumber && (
                        <div>
                          {numberLink ? (
                            <span
                              className={styles.contactText}
                            >
                              {infoItem.number}
                            </span>
                          ) : (
                            <p className={styles.contactText}>{infoItem.number}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
            {index < info?.length - 1 && <Divider style={{ margin: "0" }} />}
          </React.Fragment>
        ))}
      </motion.div>

      {/* {socialMedia?.length > 0 && (
        <motion.div
          className={styles.socialMedia}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {socialMedia?.map((social, index) => (
            <Link
              key={index}
              href={social.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <Uicons icon={social?.icon}/>
            </Link>
          ))}
        </motion.div>
      )} */}
    </motion.div>
  );
}

