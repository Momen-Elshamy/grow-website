import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./SuccessStories.module.css";

export default function SuccessStories({ successStoriesData }) {
  const router = useRouter();
  
  if (!successStoriesData) return null;

  const { icon, tagline, storiesData } = successStoriesData || {};
  const cards = storiesData || [];

  const [activeKey, setActiveKey] = useState(cards.length > 0 ? "0" : "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle query parameter to select specific story
  useEffect(() => {
    if (router.isReady && router.query.story && cards.length > 0) {
      // Guard router.query.story value before calling decodeURIComponent
      const storyQuery = router.query.story;
      const storyValue = Array.isArray(storyQuery) 
        ? storyQuery[0] 
        : typeof storyQuery === "string" 
        ? storyQuery 
        : null;
      
      if (!storyValue) return;
      
      const storyTitle = decodeURIComponent(storyValue);
      const storyIndex = cards.findIndex(
        (card) => card?.title === storyTitle || card?.heading === storyTitle
      );
      
      if (storyIndex >= 0) {
        setActiveKey(storyIndex.toString());
        // Scroll to section after a short delay to ensure component is rendered
        const timeoutId = setTimeout(() => {
          const element = document.getElementById("stories");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
        
        // Clear timeout on cleanup to avoid leaks
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, [router.isReady, router.query.story, cards]);

  const currentIndex =
    cards.length > 0
      ? parseInt(activeKey) >= 0 && parseInt(activeKey) < cards.length
        ? parseInt(activeKey)
        : 0
      : -1;
  const currentStory = currentIndex >= 0 ? cards[currentIndex] : null;

  // MEDIA HELPERS
  const videoMedia = currentStory?.video
    ? { type: "video", src: currentStory.video }
    : null;
  const imageMedia = currentStory?.image
    ? { type: "image", src: currentStory.image }
    : null;

  // VIEW IMAGE RULE
  const viewImage = videoMedia?.src || imageMedia?.src;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNext = () => {
    if (cards.length === 0) return;
    const nextIndex = (currentIndex + 1) % cards.length;
    setActiveKey(nextIndex.toString());
  };

  const handlePrev = () => {
    if (cards.length === 0) return;
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    setActiveKey(prevIndex.toString());
  };

  if (!currentStory || cards.length === 0) {
    return null;
  }

  return (
    <section id="stories" className={styles.containerSuccessStories}>
      <div className={styles.successStoriesSection}>
        <div className={styles.container}>
          <Row gutter={[60, 40]} align="stretch">
            {/* LEFT */}
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={styles.imageWrapper}
                style={{ height: "100%" }}
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
                        src={currentStory?.image?.node?.sourceUrl}
                        alt={
                          currentStory?.image?.node?.altText ||
                          currentStory?.altImage
                        }
                        width={600}
                        height={900}
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
                      <h4 className={styles.cardTitle}>
                        {currentStory?.title || currentStory?.heading}
                      </h4>
                      <p className={styles.cardDescription}>
                        {currentStory?.description}
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
              <motion.div className={styles.contentWrapper} style={{ height: "100%" }}>
                <div className={styles.tagline}>
                  <Uicons icon={icon} size="20px" />
                  <span>{tagline}</span>
                </div>
                <h2 className={styles.heading}> {currentStory?.heading}</h2>
                <p className={styles.description}>
                  {" "}
                  {currentStory?.description }
                </p>

                <div className={styles.storiesList}>
                  {cards.map((story, idx) => (
                    <motion.div
                      key={idx}
                      className={`${styles.storyItem} ${
                        activeKey === idx.toString() ? styles.activeItem : ""
                      }`}
                      onClick={() => setActiveKey(idx.toString())}
                    >
                      <h3 className={styles.storyTitle}>{story?.title}</h3>
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
              src={currentStory?.video}
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
              src={currentStory?.image?.node?.sourceUrl}
              alt={currentStory?.image?.node?.altText || currentStory?.altImage}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
