import { Button, Carousel, Flex } from "antd";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "@/components/UI/Button";
import Uicons from "@/components/UI/Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import styles from "./HeroCarousel.module.css";

export default function CarouselComponent({ heroDetails }) {
  const carouselRef = useRef(null);
  const { currentLang } = useLanguage();
  // Translation function: t("key") or t("nested.key") returns value or key as fallback
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

  const next = () => {
    carouselRef.current?.next();
  };

  const prev = () => {
    carouselRef.current?.prev();
  };

  const carouselArrows = [
    { onClick: prev, icon: "fi-rr-angle-left", className: styles.navButtonLeft, id: 1 },
    { onClick: next, icon: "fi-rr-angle-right", className: styles.navButtonRight, id: 2 },
  ];

  return (
    <div className={styles.heroContainer}>
      <Carousel
        ref={carouselRef}
        autoplay
        dots={true}
        dotPosition="bottom"
        effect="fade"
        className={styles.carousel}
      >
        {heroDetails?.map((slide, index) => (
          <div key={slide.id}>
            <div className={styles.slideContainer}>
              <Image
                src={slide.image?.node?.sourceUrl}
                alt={slide.image?.node?.altText}
                fill
                priority={index === 0}
                className={styles.backgroundImage}
              />
              {/* Overlay for better text readability */}
              <div className={`${styles.overlay} ${currentLang === "ar" ? styles.overlayRTL : ""}`} />

              {/* Content */}
              <Flex
                className={styles.contentRow}
                align="center"
                justify={currentLang === "ar" ? "flex-end" : "flex-start"}
              >
                <div className={`${styles.contentCol} ${currentLang === "ar" ? styles.contentColRTL : ""}`}>
                  <div key={`content-${slide.id}`}>
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={styles.title}
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className={styles.description}
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                      className={styles.buttonsContainer}
                    >
                      <CustomButton href="/services">{t("heroButtons.exploreServices")}</CustomButton>
                      <CustomButton href="/about" className={styles.aboutButton} icon={null}>
                        {t("heroButtons.aboutUs")}
                      </CustomButton>
                    </motion.div>
                  </div>
                </div>
              </Flex>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Navigation Arrows */}
      {carouselArrows.map((nav) => (
        <Button
          key={nav.id}
          onClick={nav.onClick}
          className={`${styles.navButton} ${nav.className}`}
        >
          <Uicons icon={nav.icon} size="32px" color="white" />
        </Button>
      ))}
    </div>
  );
}
