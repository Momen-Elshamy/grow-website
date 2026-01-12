import React, { useState, useEffect } from "react";
import { Row, Col, Steps, Typography, Flex } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./SolutionsSection.module.css";

const { Title, Text } = Typography;

const AgricultureProcess = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: "Farm Operation and Management",
      description:
        "Soil preparation is crucial in the modern farming ecosystem.",
    },
    {
      title: "Farm Resource Planning solution “FRP”",
      description:
        "Efficient irrigation systems are vital in the farming ecosystem.",
    },
    {
      title: "Water Management",
      description: "Integrated pest management strategies.",
    },
    {
      title: "Human Capital Training & Development",
      description:
        "Timing of the harvest is critical & is determined by monitoring crop maturity facilitates harvesting.",
    },
    {
      title: "Commercial Management",
      description:
        "Soil preparation is crucial in the modern farming ecosystem.",
    },
  ];

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
              <Uicons icon="fi-rr-leaf" className={styles.leafIcon} />
              <Text className={styles.subtitle}>
                Simple Steps. Powerful Agricultural Solutions.
              </Text>
            </Flex>
            <Title level={2} className={styles.mainTitle}>
              Innovative solutions for agriculture optimal crops growth & soil
              health.
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
                items={steps.map((step, index) => ({
                  title: <span className={styles.stepTitle}>{step.title}</span>,
                  description: (
                    <span className={styles.stepDescription}>
                      {step.description}
                    </span>
                  ),
                  icon: <div className={styles.stepIcon}>0{index + 1}</div>,
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
                src="/images/solutions/banner-process.webp"
                alt="Agriculture Process"
                width={500}
                height={500}
                className={styles.mainImage}
              />
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className={styles.overlayCard}
              >
                <div className={styles.iconBox}>
                  <Uicons icon="fi-rr-mobile-notch" size={40} color="#0b3d1b" />
                </div>
                <div className={styles.overlayTextWrapper}>
                  <Text className={styles.overlayText}>
                    Leading provider of seeds and plants for all greenhouses.
                  </Text>
                </div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AgricultureProcess;
