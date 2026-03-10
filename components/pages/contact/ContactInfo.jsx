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
    <motion.div className={styles.leftContent} variants={leftContentVariants}>
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

                {(() => {
                  // Show only info[0] when: CMS flag set, or block has multiple info items (e.g. multiple emails)
                  const hasMultipleInfo =
                    Array.isArray(item?.info) && item.info.length > 1;
                  const firstLooksLikeEmail =
                    item?.info?.[0]?.value?.includes?.("@");
                  const useOnlyFirstInfo =
                    item?.showOnlyFirstInfo === true ||
                    (hasMultipleInfo && firstLooksLikeEmail);
                  const infoList =
                    useOnlyFirstInfo && item?.info?.[0] != null
                      ? [item.info[0]]
                      : (item?.info ?? []);

                  return infoList.map((infoItem, infoIndex) => {
                    const hasValue = infoItem.value;
                    const hasNumber = infoItem.number;
                    const link = infoItem.valueLink || infoItem.link;
                    const numberLink = infoItem.numberLink || infoItem.link;

                    if (useOnlyFirstInfo) {
                      if (!hasValue) return null;
                      return (
                        <div key={`info-${infoIndex}`}>
                          {link ? (
                            <Link
                              href={link}
                              target={
                                link.startsWith("http") ? "_blank" : undefined
                              }
                              rel={
                                link.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className={styles.contactText}
                            >
                              {infoItem.value}
                            </Link>
                          ) : (
                            <p className={styles.contactText}>
                              {infoItem.value}
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (!hasValue && !hasNumber) return null;

                    return (
                      <div key={`info-${infoIndex}`}>
                        {hasValue &&
                          (link ? (
                            <Link
                              href={link}
                              target={
                                link.startsWith("http") ? "_blank" : undefined
                              }
                              rel={
                                link.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className={styles.contactText}
                            >
                              {infoItem.value}
                            </Link>
                          ) : (
                            <p className={styles.contactText}>
                              {infoItem.value}
                            </p>
                          ))}

                        {hasNumber &&
                          (numberLink ? (
                            <Link
                              href={numberLink}
                              className={styles.contactText}
                            >
                              {infoItem.number}
                            </Link>
                          ) : (
                            <p className={styles.contactText}>
                              {infoItem.number}
                            </p>
                          ))}
                      </div>
                    );
                  });
                })()}

                {item?.phoneNumbers?.length > 0 && (
                  <div className={styles.phoneNumbersStack}>
                    {item.phoneNumbers
                      .filter((pn) => (pn?.number ?? "").toString().trim())
                      .map((pn, pnIndex) => (
                        <React.Fragment key={`phone-${pnIndex}`}>
                          {pnIndex > 0 && (
                            <span className={styles.phoneSeparator}> / </span>
                          )}
                          {pn?.link ? (
                            <Link href={pn.link} className={styles.contactText}>
                              {(pn?.number ?? "").toString().trim()}
                            </Link>
                          ) : (
                            <span className={styles.contactText}>
                              {(pn?.number ?? "").toString().trim()}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                )}
              </div>
            </motion.div>

            {index < info?.length - 1 && <Divider style={{ margin: "0" }} />}
          </React.Fragment>
        ))}
      </motion.div>
    </motion.div>
  );
}
