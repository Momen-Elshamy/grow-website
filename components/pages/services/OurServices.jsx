import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Row, Col, Modal } from "antd";
import styles from "./OurServices.module.css";
import Uicons from "@/components/UI/Uicons";



export default function OurServices({ourServicesData}) {
  const sectionRef = useRef(null);
  const [selectedService, setSelectedService] = useState(ourServicesData?.services[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section
      ref={sectionRef}
      id="services-content"
      className={styles.servicesSection}
    >
      <div className={styles.container}>
        <Row gutter={[60, 60]}>
          <Col xs={24} lg={10}>
            <div className={styles.leftColumn}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={styles.title}
              >
                Our Services
              </motion.h2>
              <Row gutter={[16, 16]} className={styles.servicesList}>
                {ourServicesData?.services.map((service, index) => (
                  <Col xs={24} sm={24} md={24} lg={24} key={service.id}>
                    <motion.customButton
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`${styles.serviceButton} ${
                        selectedService.slug === service.slug ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedService(service);
                      
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={styles.serviceText}>
                        {service.title}
                      </span>
                      <Uicons
                        icon="fi-rr-arrow-small-right"
                        size="20px"
                        style={{ color: "#ffffff" }}
                      />
                    </motion.customButton>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          <Col xs={24} lg={14}>
            <div className={styles.rightColumn}>
            <AnimatePresence mode="wait">
                <motion.p
                  key={selectedService.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={styles.title}
                >
                  {selectedService.title}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedService.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={styles.description}
                >
                  {selectedService.description}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedService.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={styles.videoContainer}
                >
                  <Image
                    src={selectedService.image?.node?.sourceUrl}
                    alt={selectedService.altImage}
                    fill
                    className={styles.videoImage}
                  />
                  <button
                    className={styles.playButton}
                    onClick={handleOpenModal}
                  >
                    <div className={styles.playIconWrapper}>
                      <Uicons
                        icon="fi-rr-expand"
                        size="24px"
                        style={{
                          color: "#ffffff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </div>
                  </button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                    key={selectedService.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={styles.description}
                >
                  {selectedService.moreDescription}
                </motion.p>
              </AnimatePresence>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width="90%"
        centered
        destroyOnClose
        className={styles.modal}
        bodyStyle={{ padding: 0, backgroundColor: "transparent" }}
      >
        <div className={styles.modalImageWrapper}>
          <Image
            src={selectedService?.image?.node?.sourceUrl}
            alt={selectedService?.altImage}
            width={1200}
            height={800}
            className={styles.modalImage}
            style={{ width: "100%", height: "auto" }}
            unoptimized
          />
        </div>
      </Modal>
    </section>
  );
}
