"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Uicons from "../../UI/Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";
import styles from "./SuccessStories.module.css";

export default function SuccessStories({ successStoriesData }) {
  const router = useRouter();
  const { currentLang } = useLanguage();
  const isRTL = currentLang === "ar";

  if (!successStoriesData) return null;

  const { icon, tagline, storiesData = [] } = successStoriesData || {};

  const [activeKey, setActiveKey] = useState(storiesData.length > 0 ? "0" : "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle query param for specific story
  useEffect(() => {
    if (!router.isReady || !router.query.story || storiesData.length === 0)
      return;

    const storyQuery = Array.isArray(router.query.story)
      ? router.query.story[0]
      : router.query.story;

    if (!storyQuery) return;

    const storyTitle = decodeURIComponent(storyQuery);
    const storyIndex = storiesData.findIndex(
      (story) => story?.title === storyTitle || story?.heading === storyTitle,
    );

    if (storyIndex >= 0) {
      setActiveKey(storyIndex.toString());

      // Scroll to section after render
      const timeoutId = setTimeout(() => {
        const el = document.getElementById("stories");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [router.isReady, router.query.story, storiesData]);

  const currentIndex = useMemo(() => {
    const idx = parseInt(activeKey, 10);
    return idx >= 0 && idx < storiesData.length ? idx : 0;
  }, [activeKey, storiesData]);

  const currentStory = storiesData[currentIndex] || null;

  const currentMedia = useMemo(() => {
    if (!currentStory) return null;
    if (currentStory.video) return { type: "video", src: currentStory.video };
    if (currentStory.image?.node?.sourceUrl)
      return { type: "image", src: currentStory.image.node.sourceUrl };
    return null;
  }, [currentStory]);

  const handleOpenModal = () => currentMedia && setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNext = () =>
    setActiveKey(((currentIndex + 1) % storiesData.length).toString());
  const handlePrev = () =>
    setActiveKey(
      ((currentIndex - 1 + storiesData.length) % storiesData.length).toString(),
    );

  if (!currentStory || storiesData.length === 0) return null;

  return (
    <section id="stories" className={styles.containerSuccessStories}>
      <div className={styles.successStoriesSection}>
        <div className={styles.container}>
          <Row gutter={[60, 40]} align="stretch">
            {/* LEFT: Image & Navigation */}
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
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "83vh",
                      }}
                    >
                      <Image
                        src={currentStory.image.node.sourceUrl}
                        alt={
                          currentStory.image.node.altText ||
                          currentStory.altImage ||
                          ""
                        }
                        width={600}
                        height={900}
                        sizes="(max-width: 968px) 100vw, 50vw"
                        loading="lazy"
                        className={styles.mainImage}
                      />

                      {/* ICON ONLY CLICKABLE */}
                      <button
                        className={styles.playButton}
                        style={{ border: "none" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal();
                        }}
                        aria-label={
                          currentMedia.type === "video"
                            ? "Play Video"
                            : "View Image"
                        }
                      >
                        <Uicons
                          icon={
                            currentMedia.type === "video"
                              ? "fi-rr-play"
                              : "fi-rr-expand"
                          }
                          size="24px"
                          color="white"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </button>
                    </motion.div>
                  </AnimatePresence>

                  {/* CARD */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`card-${activeKey}`}
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
                  <div
                    dir="ltr"
                    className={`${styles.navigationArrows} ${
                      isRTL ? styles.navigationArrowsRTL : ""
                    }`}
                  >
                    <button
                      onClick={handlePrev}
                      className={styles.navBtn}
                      aria-label="Previous Story"
                    >
                      <Uicons
                        icon={isRTL ? "fi-rr-angle-right" : "fi-rr-angle-left"}
                        size="20px"
                        color="white"
                      />
                    </button>
                    <button
                      onClick={handleNext}
                      className={styles.navBtn}
                      aria-label="Next Story"
                    >
                      <Uicons
                        icon={isRTL ? "fi-rr-angle-left" : "fi-rr-angle-right"}
                        size="20px"
                        color="white"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* RIGHT: Story List & Content */}
            <Col xs={24} lg={12}>
              <motion.div
                className={styles.contentWrapper}
                style={{ height: "100%" }}
              >
                <div className={styles.tagline}>
                  <Uicons icon={icon} size="20px" />
                  <span>{tagline}</span>
                </div>

                <h2 className={styles.heading}>
                  {currentStory?.title || currentStory?.heading}
                </h2>
                <p className={styles.description}>
                  {currentStory?.description}
                </p>

                <div className={styles.storiesList}>
                  {storiesData.map((story, idx) => (
                    <motion.div
                      key={idx}
                      className={`${styles.storyItem} ${
                        activeKey === idx.toString() ? styles.activeItem : ""
                      }`}
                      onClick={() => setActiveKey(idx.toString())}
                      aria-label={`Select story ${
                        story?.title || story?.heading
                      }`}
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
        destroyOnHidden
        className={styles.videoModal}
        styles={{ body: { padding: 0, backgroundColor: "transparent" } }}
      >
        {currentMedia?.type === "video" ? (
          <div className={styles.videoResponsive}>
            <iframe
              src={currentMedia.src}
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
              src={currentMedia.src}
              alt={
                currentStory?.image?.node?.altText ||
                currentStory?.altImage ||
                ""
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
