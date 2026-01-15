import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./SuccessStories.module.css";

const storiesData = [
  {
    id: "1",
    title: "Together with people",
    heading: "Building strong partnerships for a better future!",
    description:
      "We work as a global network to bring together the people, ideas and resources that can nourish lives around the world. Our collaborative approach ensures sustainable growth.",
    media: [
      // { type: "image", src: "/images/about/bg-newsletter.webp" },
      {
        type: "video",
        src: "https://www.youtube.com/embed/vDMwdqtipeI?feature=oembed&autoplay=1&controls=1",
        featerImage: "/images/about/bg-newsletter.webp",
      },
    ],
  },
  {
    id: "2",
    title: "Only organic products",
    heading: "Purely natural solutions for healthy harvests!",
    description:
      "We help ensure farmers and consumers have the technologies needed to protect crops safely.",
    media: [{ type: "image", src: "/images/about/service.webp" }],
  },
  {
    id: "3",
    title: "Impact on the planet",
    heading: "Restoring balance to our natural ecosystems!",
    description:
      "Our mission is to restore soil health and biodiversity through sustainable practices.",
    media: [{ type: "image", src: "/images/about/blog-6.webp" }],
  },
];

export default function SuccessStories() {
  const [activeKey, setActiveKey] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentStory = storiesData.find((s) => s.id === activeKey);

  // MEDIA HELPERS
  const videoMedia =
    currentStory?.media?.find((m) => m.type === "video") || null;

  const imageMedia =
    currentStory?.media?.find((m) => m.type === "image") || null;

  // VIEW IMAGE RULE
  const viewImage = videoMedia?.featerImage || imageMedia?.src;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNext = () => {
    const index = storiesData.findIndex((s) => s.id === activeKey);
    setActiveKey(storiesData[(index + 1) % storiesData.length].id);
  };

  const handlePrev = () => {
    const index = storiesData.findIndex((s) => s.id === activeKey);
    setActiveKey(
      storiesData[(index - 1 + storiesData.length) % storiesData.length].id
    );
  };

  return (
    <section id="stories" className={styles.containerSuccessStories}>
      <div className={styles.successStoriesSection}>
        <div className={styles.container}>
          <Row gutter={[60, 40]} align="middle">
            {/* LEFT */}
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={styles.imageWrapper}
              >
                <div className={styles.mainImageContainer}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeKey}
                      className={styles.imageMotionWrapper}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={viewImage}
                        alt={currentStory.title}
                        width={600}
                        height={600}
                        className={styles.mainImage}
                      />

                      {/* ICON ONLY CLICKABLE */}
                      <div
                        className={styles.playButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal();
                        }}
                      >
                        <Uicons
                          icon={videoMedia ? "fi-rr-play" : "fi-rr-expand"}
                          size="24px"
                          color="white"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* CARD */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeKey}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className={styles.overlappingCard}
                    >
                      <h4 className={styles.cardTitle}>{currentStory.title}</h4>
                      <p className={styles.cardDescription}>
                        {currentStory.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* ARROWS */}
                  <div className={styles.navigationArrows}>
                    <button onClick={handlePrev} className={styles.navBtn}>
                      <Uicons
                        icon="fi-rr-angle-left"
                        size="20px"
                        color="white"
                      />
                    </button>
                    <button onClick={handleNext} className={styles.navBtn}>
                      <Uicons
                        icon="fi-rr-angle-right"
                        size="20px"
                        color="white"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* RIGHT */}
            <Col xs={24} lg={12}>
              <motion.div className={styles.contentWrapper}>
                <h2 className={styles.heading}>{currentStory.heading}</h2>
                <p className={styles.description}>{currentStory.description}</p>

                <div className={styles.storiesList}>
                  {storiesData.map((story) => (
                    <motion.div
                      key={story.id}
                      className={`${styles.storyItem} ${
                        activeKey === story.id ? styles.activeItem : ""
                      }`}
                      onClick={() => setActiveKey(story.id)}
                    >
                      <h3 className={styles.storyTitle}>{story.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width="90%"
        centered
        destroyOnClose
        className={styles.videoModal}
        bodyStyle={{ padding: 0, backgroundColor: "transparent" }}
      >
        {videoMedia ? (
          <div className={styles.videoResponsive}>
            <iframe
              src={videoMedia.src}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className={styles.videoResponsive}>
            <Image
              src={imageMedia.src}
              alt={currentStory.title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
