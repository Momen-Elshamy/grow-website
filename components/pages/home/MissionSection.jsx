import React, { useState } from "react";
import { Row, Col, Typography, Button as AntButton } from "antd";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../../UI/Button";
import Uicons from "../../UI/Uicons";
import styles from "./MissionSection.module.css";
import MissionLeftContent from "./MissionLeftContent";
import MissionRightContent from "./MissionRightContent";

const { Title, Paragraph } = Typography;

const contentData = [
  {
    id: "mission",
    title: "Our Mission",
    text: "Our mission is to empower our customers by delivering highest quality plants and innovative solutions tailored to their specific needs.",
  },
  {
    id: "vision",
    title: "Our Vision",
    text: "Our vision is to advocates for formulators and distributors of organic crop pesticides, ensuring their participation in shaping pesticide policy.",
  },
];

const leftData = {
  title: (
    <>
      Feeding The World <br /> With Consistency.
    </>
  ),
  paragraph:
    "We are committed to build long lasting partnerships with our clients founded on trust to foster growth.",
  imageSrc: "/images/mission/banner.png",
};

export default function MissionSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % contentData.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + contentData.length) % contentData.length
    );
  };

  const currentContent = contentData[activeIndex];

  return (
    <section className={styles.missionSection}>
      <div className={styles.backgroundWrapper}>
        <Image
          src="/images/services/background-services.webp"
          alt="Mission Background"
          fill
          className={styles.backgroundImage}
          priority={false}
        />
        <div className={styles.backgroundOverlay} />
      </div>
      <div className={styles.container}>
        <Row gutter={0} align="stretch" className={styles.missionRow}>
          {/* Left Side: Dark Green Card */}
          <Col xs={24} lg={16} className={styles.leftCol}>
            <MissionLeftContent {...leftData} />
          </Col>

          {/* Right Side: Yellow Card */}
          <Col xs={24} lg={8} className={styles.rightCol}>
            <MissionRightContent
              currentContent={currentContent}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}
