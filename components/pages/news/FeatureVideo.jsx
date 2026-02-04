import React, { useState, useMemo } from "react";
import { Modal } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import Uicons from "@/components/UI/Uicons";
import styles from "./FeatureVideo.module.css";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export default function FeatureVideo({ featureVideoData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { video, title, description, featureImage } = featureVideoData || {};

  const embedVideoUrl = useMemo(() => getYouTubeEmbedUrl(video), [video]);

  if (!featureVideoData) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.videoWrapper}>
          <div className={styles.imageContainer}>
            {featureImage?.node?.sourceUrl && (
              <Image
                src={featureImage.node.sourceUrl}
                alt={featureImage.node.altText || title}
                fill
                priority
                className={styles.videoImage}
                sizes="100vw"
              />
            )}
            <div className={styles.overlay} />
            <div className={styles.contentOverlay}>
              <motion.div
                className={styles.textContent}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {title && <h2 className={styles.title}>{title}</h2>}
                {description && (
                  <p className={styles.description}>{description}</p>
                )}
              </motion.div>

              <motion.div
                className={styles.playButtonWrapper}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={styles.playButton}
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Play video"
                >
                  <Uicons icon="fi-rr-play" size={24} color="#ffffff" />
                </button>
              </motion.div>
            </div>
            <div className={styles.graphicContainer}>
              <Image
                src="/images/footergraphic.svg"
                alt=""
                className={styles.footerGraphic}
                width={1920}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: "1400px" }}
        centered
        destroyOnHidden
        styles={{ body: { padding: 0, backgroundColor: "transparent" } }}
        className={styles.videoModal}
      >
        <div className={styles.videoResponsive}>
          <iframe
            width="100%"
            height="100%"
            src={`${embedVideoUrl}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </section>
  );
}
