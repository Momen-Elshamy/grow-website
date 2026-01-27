import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Row, Col, Modal } from "antd";
import styles from "./OurServices.module.css";
import Uicons from "@/components/UI/Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

export default function OurServices({ ourServicesData }) {
  const sectionRef = useRef(null);
  const { currentLang } = useLanguage();
  const isRTL = currentLang === "ar";
  const t = useMemo(() => {
    const dict = currentLang === "ar" ? ar : en;
    return (key) => {
      const keys = key.split(".");
      let val = dict;
      for (const k of keys) {
        val = val?.[k];
      }
      return val ?? key;
    };
  }, [currentLang]);
  const services = ourServicesData?.services ?? [];
  const [selectedService, setSelectedService] = useState(services[0] ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const list = ourServicesData?.services ?? [];
    setSelectedService(list[0] ?? null);
  }, [ourServicesData]);

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
            <div
              className={`${styles.leftColumn} ${
                isRTL ? styles.leftColumnRTL : ""
              }`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={styles.title}
              >
                {t("ourServicesTitle")}
              </motion.h2>
              <Row gutter={[16, 16]} className={styles.servicesList}>
                {services.map((service, index) => (
                  <Col xs={24} sm={24} md={24} lg={24} key={service?.id ?? index}>
                    <motion.customButton
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`${styles.serviceButton} ${
                        selectedService?.slug === service?.slug
                          ? styles.active
                          : ""
                      } ${isRTL ? styles.serviceButtonRTL : ""}`}
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
                        icon={isRTL ? "fi-rr-arrow-small-left" : "fi-rr-arrow-small-right"}
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
              {selectedService ? (
                <>
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
                      key={`${selectedService.slug}-desc`}
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
                      key={`${selectedService.slug}-img`}
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
                      key={`${selectedService.slug}-more`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className={styles.description}
                    >
                      {selectedService.moreDescription}
                    </motion.p>
                  </AnimatePresence>
                </>
              ) : null}
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
