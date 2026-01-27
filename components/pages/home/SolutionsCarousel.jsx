import { Carousel } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import CustomButton from "@/components/UI/Button";
import styles from "./Solutions.module.css";

export default function SolutionsCarousel({ solutionscarousel }) {
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

  return (
    <Carousel
      dots={true}
      autoplay
      infinite={false}
      slidesToShow={3}
      slidesToScroll={3}
      className={`${styles.carousel} services-carousel`}
      responsive={[
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 868,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]}
    >
      {solutionscarousel?.map((solution, index) => (
        <div key={solution.id} className={styles.carouselSlide}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.2,
                },
              },
              hover: {
                y: -10,
                transition: { duration: 0.3, ease: "easeInOut" },
              },
            }}
            className={styles.serviceCard}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
              className={styles.serviceImageContainer}
            >
              <Image
                src={solution.image?.node?.sourceUrl}
                alt={solution.image?.node?.altText}
                fill
                className={styles.serviceImage}
              />
            </motion.div>

            <div className={`${styles.cardContentWrapper} ${isRTL ? styles.cardContentWrapperRTL : ""}`}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className={`${styles.serviceContent} ${isRTL ? styles.serviceContentRTL : ""}`}
              >
                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    hover: {
                      color: "#153E20",
                    },
                  }}
                  transition={{ duration: 0.5 }}
                  className={styles.serviceTitle}
                >
                  {solution?.title}
                </motion.h3>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    hover: {
                      color: "#333",
                      transition: { duration: 0.3 },
                    },
                  }}
                  transition={{ duration: 0.5 }}
                  className={styles.serviceDescription}
                >
                  {solution?.description}
                </motion.p>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <CustomButton href="/solutions" className={styles.serviceButton}>
                    {t("homeButtons.exploreMore")}
                  </CustomButton>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ))}
    </Carousel>
  );
}
