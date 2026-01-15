import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import Uicons from "../../UI/Uicons";
import styles from "./ExpertsSection.module.css";

const expertsData = [
  {
    id: 1,
    media: [
      {
        type: "video",
        src: "https://www.youtube.com/embed/vDMwdqtipeI?feature=oembed&autoplay=1&controls=1",
        featerImage: "/images/about/bg-newsletter.webp",
      },
    ],
    name: "John Doe",
    description: "Agricultural Specialist with 10+ years of experience.",
  },
  {
    id: 2,
    image: "/images/about/blog-6.webp",
    name: "Jane Smith",
    description: "Expert in sustainable farming and soil health.",
  },
  {
    id: 3,
    image: "/images/services/bg-services.webp",
    name: "Robert Brown",
    description: "Pest management planning and crop protection.",
  },
  {
    id: 4,
    image: "/images/about/ptitle-pricing.webp",
    name: "Emily White",
    description: "Energy efficiency and water recycling expert.",
  },
  {
    id: 5,
    image: "/images/about/bg-newsletter.webp",
    name: "Michael Green",
    description: "Leading the future of smart agriculture.",
  },
  {
    id: 6,
    image: "/images/about/service.webp",
    name: "Sarah Jenkins",
    description: "Dedication to purely organic products.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { y: -10, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function ExpertsSection() {
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
          <h2 className={styles.title}>Meet Our Experts</h2>
          <p className={styles.description}>
            Our team brings years of agricultural expertise and innovative
            thinking.
          </p>
        </motion.div>

        <Row gutter={[30, 30]}>
          {expertsData.map((expert, index) => {
            const media = expert.media?.[0];
            const isVideo = media?.type === "video";
            const displayImage = isVideo ? media.featerImage : expert.image;

            return (
              <Col key={expert.id} xs={24} sm={12} md={8}>
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
                    {displayImage && (
                      <Image
                        src={displayImage}
                        alt={expert.name}
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
                        style={{display: "flex", alignItems: "center", justifyContent: "center"}}
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
          selectedMedia.media?.[0] && (
            <div className={styles.videoResponsive}>
              <iframe
                width="100%"
                height="100%"
                src={selectedMedia.media[0].src}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

        {selectedMedia &&
          selectedMedia.mediaType === "image" &&
          selectedMedia.image && (
            <Image
              src={selectedMedia.image}
              alt={selectedMedia.name}
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
