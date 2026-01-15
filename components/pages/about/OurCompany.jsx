import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "../../UI/Button";
import Uicons from "../../UI/Uicons";
import styles from "./OurCompany.module.css";
import Marquee from "react-fast-marquee";

export default function OurCompany() {
  const marqueeData = [
    { text: "Grow Egypt", icon: "fi-rr-leaf" },
    { text: "Grow Egypt", icon: "fi-rr-leaf" },
    { text: "Grow Egypt", icon: "fi-rr-leaf" },
    { text: "Grow Egypt", icon: "fi-rr-leaf" },
    { text: "Grow Egypt", icon: "fi-rr-leaf" },
  ];
  return (
    <section id="company" className={styles.ourCompanySection}>
      <div className={styles.container}>
        <Row gutter={[60, 40]} align="middle">
          {/* Left Side: Image with decorative text */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.imageWrapper}
            >
              <div className={styles.mainImageContainer}>
                <Image
                  src="/images/about/banner-6.webp"
                  alt="Our Company"
                  width={600}
                  height={600}
                  className={styles.mainImage}
                />
              </div>
              <div className={styles.decorativeText}>Collaboration</div>
            </motion.div>
          </Col>

          {/* Right Side: Content */}
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.contentWrapper}
            >
              <div className={styles.tagline}>
                <Uicons icon="fi-rr-leaf" size="20px" color="#107634" />
                <span>Our Company</span>
              </div>

              <h2 className={styles.heading}>
                Helping farmers in delivering & sourcing products that are vital
                for living with innovation.
              </h2>

              <p className={styles.description}>
                Our success depends on our customers&apos; success, so we are
                committed to building long lasting partnerships based on trust,
                collaboration, and foster sustainable growth for our customers
                and contribute to the horticulture industry&apos;s advancement.
              </p>
              <p className={styles.description}>
                People are at the heart of everything we do from agriculture and
                forestry work together with partners from processing to trade.
              </p>

              <div className={styles.buttonGroup}>
                <CustomButton href="#experts" className={styles.teamBtn}>
                  Meet Our Experts
                </CustomButton>
              </div>

              {/* Marquee Section */}
              <div className={styles.marqueeWrapper}>
                <Marquee gradient={false} speed={40}>
                  {marqueeData.map((item, index) => (
                    <div key={index} className={styles.marqueeItem}>
                      <span className={styles.marqueeText}>{item.text}</span>
                      <div className={styles.marqueeIcon}>
                        <Uicons
                          icon={item.icon}
                          size="40px"
                          color="#e0e0e0"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
