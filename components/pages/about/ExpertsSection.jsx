import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./ExpertsSection.module.css";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { y: -10, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function ExpertsSection({ expertsData }) {
  if (!expertsData) return null;

  const { title, description, expertsData: expertsList } = expertsData || {};
  const experts = expertsList || [];
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleOpenModal = (expert, mediaType) => {
    setSelectedMedia({ ...expert, mediaType });
  };

  const handleCloseModal = () => setSelectedMedia(null);

  return (
    <section id="experts" className={styles.expertsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </motion.div>

        <Row gutter={[30, 30]}>
          {experts.map((expert, index) => {
            const isVideo = !!expert.video;
            const displayImage = expert.image;

            return (
              <Col key={index} xs={24} sm={12} md={8}>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.expertCard}
                  whileHover="hover"
                >
                  <div className={styles.imageWrapper}>
                    {displayImage?.node?.sourceUrl && (
                      <Image
                        src={displayImage.node.sourceUrl}
                        alt={
                          displayImage.node.altText ||
                          expert.altImage ||
                          expert.name
                        }
                        width={400}
                        height={500}
                        className={styles.expertImage}
                      />
                    )}

                    {/* Top-right icon */}
                    <motion.div
                      className={styles.topRightIcon}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        hover: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(expert, isVideo ? "video" : "image");
                      }}
                    >
                      <Uicons
                        icon={isVideo ? "fi-rr-play" : "fi-rr-expand"}
                        size="22px"
                        color="#fff"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </motion.div>

                    {/* Overlay info */}
                    <div className={styles.infoOverlay}>
                      <div className={styles.overlayContent}>
                        <h3 className={styles.expertName}>{expert.name}</h3>
                        <motion.p
                          className={styles.expertDescription}
                          variants={{
                            hidden: { opacity: 0, height: 0, marginTop: 0 },
                            hover: { opacity: 1, height: "auto", marginTop: 8 },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {expert.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* Modal */}
      <Modal
        title={null}
        open={!!selectedMedia}
        onCancel={handleCloseModal}
        footer={null}
        width="90%"
        centered
        destroyOnClose
        className={styles.imageModal}
        bodyStyle={{ padding: 0, backgroundColor: "transparent" }}
      >
        {selectedMedia &&
          selectedMedia.mediaType === "video" &&
          selectedMedia.video && (
            <div className={styles.videoResponsive}>
              <iframe
                width="100%"
                height="100%"
                src={selectedMedia.video}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

        {selectedMedia &&
          selectedMedia.mediaType === "image" &&
          selectedMedia.image?.node?.sourceUrl && (
            <Image
              src={selectedMedia.image.node.sourceUrl}
              alt={
                selectedMedia.image.node.altText ||
                selectedMedia.altImage ||
                selectedMedia.name
              }
              width={1200}
              height={1500}
              className={styles.modalImage}
              style={{ width: "100%", height: "auto" }}
            />
          )}
      </Modal>
    </section>
  );
}
