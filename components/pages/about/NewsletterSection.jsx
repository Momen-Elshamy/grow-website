"use client";

import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import { motion } from "framer-motion";
import CustomButton from "../../UI/Button";
import styles from "./NewsletterSection.module.css";
import Image from "next/image";
import Link from "next/link";

export default function NewsletterSection({ newsletterData }) {
  if (!newsletterData) return null;

  const { title, description, image , email} = newsletterData || {};
  return (
    <section className={styles.newsletterSection}>
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <Image
            src={image?.node?.sourceUrl}
            alt={image?.node?.altText}
            fill
            className={styles.backgroundImage}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.whiteCard}
        >
          <Row gutter={[40, 30]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.textContent}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div className={styles.formWrapper}>
                <div className={styles.inputGroup}>
                  <Input
                    type="email"
                    placeholder="Your Email Address"
                    className={styles.emailInput}
                  />
                  <Link href={`mailto:${email}`}>
                    <CustomButton>
                      Subscribe
                    </CustomButton>
                  </Link>
                </div>

                <p className={styles.privacyText}>
                  By subscribing, you accept the{" "}
                  <Link href="/privacy">Privacy Policy</Link>
                </p>
              </div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
}
