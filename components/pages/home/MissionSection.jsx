import React, { useState } from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import styles from "./MissionSection.module.css";
import MissionLeftContent from "./MissionLeftContent";
import MissionRightContent from "./MissionRightContent";

export default function MissionSection({ missionData }) {
  const { title, description, image, currentcontent } = missionData || {};

  const leftData = {
    title: title,
    paragraph: description,
    imageSrc: image?.node?.sourceUrl,
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % currentcontent.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + currentcontent.length) % currentcontent.length
    );
  };

  const currentContent = currentcontent[activeIndex];

  return (
    <section className={styles.missionSection}>
      <div className={styles.backgroundWrapper}>
        <Image
          src="/images/services/bg-services.webp"
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
