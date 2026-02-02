import React, { useState, useEffect } from "react";
import { Row, Col, Steps, Typography, Flex } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./ServicesSection.module.css";

const { Title, Text } = Typography;

export default function ServicesSection({ servicesData }) {
  const { icon, subtitle, title, steps, image, overlaytext } = servicesData || {};
  const [current, setCurrent] = useState(0);

  const onChange = (value) => {
    setCurrent(value);
  };

  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-step-index"));
          if (!isNaN(index)) {
            setCurrent(index);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when element is in the middle 20% of the screen
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const stepElements = document.querySelectorAll(
      `.${styles.customSteps} .ant-steps-item`
    );
    stepElements.forEach((el, index) => {
      el.setAttribute("data-step-index", index.toString());
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Flex vertical gap="small" className={styles.header}>
            <Flex align="center" gap="small">
              <Uicons icon={icon} className={styles.leafIcon} />
              <Text className={styles.subtitle}>
                {subtitle}
              </Text>
            </Flex>
            <Title level={2} className={styles.mainTitle}>
              {title}
            </Title>
          </Flex>
        </motion.div>

        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Steps
                direction="vertical"
                current={current}
                onChange={onChange}
                items={steps?.map((step, index) => ({
                  title: <span className={styles.stepTitle}>{step?.title}</span>,
                  description: (
                    <span className={styles.stepDescription}>
                      {step?.description}
                    </span>
                  ),
                  icon: <div className={styles.stepIcon}>{index + 1}</div>,
                }))}
                className={styles.customSteps}
              />
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={styles.imageWrapper}
            >
              <Image
                src={image?.node?.sourceUrl}
                alt={image?.node?.altText}
                fill
                className={styles.mainImage}
                sizes="(max-width: 992px) 100vw, 50vw"
              />
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className={styles.overlayCard}
              >
                <div className={styles.iconBox}>
                  <Uicons icon={icon} size={40} color="#0b3d1b" />
                </div>
                <div className={styles.overlayTextWrapper}>
                  <Text className={styles.overlayText}>
                    {overlaytext}
                  </Text>
                </div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
