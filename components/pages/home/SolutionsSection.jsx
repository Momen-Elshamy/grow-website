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
    console.log("onChange:", value);
    setCurrent(value);
  };

  const steps = [
    {
      title: "Preparation of soil",
      description:
        "Soil preparation is crucial in the modern farming ecosystem, this process involves testing soil for nutrient and pH levels.",
    },
    {
      title: "Irrigation & fertilisation",
      description:
        "Efficient irrigation systems are vital in the farming ecosystem, especially in regions with the unpredictable rainfall.",
    },
    {
      title: "Pest and disease control",
      description:
        "Integrated pest management strategies, including the use of biocontrol agents and rotation to manage pests and diseases.",
    },
    {
      title: "Harvesting & storage",
      description:
        "Timing of the harvest is critical & is determined by monitoring crop maturity facilitates harvesting, especially for large farms.",
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
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Flex vertical gap="small" className={styles.header}>
            <Flex align="center" gap="small">
              <Uicons icon="fi-rr-leaf" className={styles.leafIcon} />
              <Text className={styles.subtitle}>
                See how it works with easy steps for our agriculture process
              </Text>
            </Flex>
            <Title level={2} className={styles.mainTitle}>
              Empowering agriculture and eco farming with sustainable practices
              and innovations!
            </Title>
          </Flex>
        </motion.div>

        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
                viewport={{ once: true }}
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
