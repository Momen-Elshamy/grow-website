"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import CustomButton from "@/components/UI/Button";
import { navLinks } from "@/src/../_data/navigation";
import {
  scrollToSection,
  scrollToSectionAfterNavigate,
} from "@/utils/scroll";
import styles from "./Solutions.module.css";

export default function SolutionsCarousel({ solutionscarousel = [] }) {
  const carouselRef = useRef(null);
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const solutionsLinks = useMemo(() => {
    return navLinks.find((link) => link.name === "solutions")?.children || [];
  }, []);

  const handleSolutionClick = useCallback(
    (e, index) => {
      const sectionId = solutionsLinks[index]?.key;
      if (!sectionId) return;

      const path = "/solutions";
      
      if (typeof window !== "undefined" && router.pathname === path) {
        e.preventDefault();
        scrollToSection(sectionId, 80);
      } else {
        // Allow default Link behavior but help with navigation
        // If it's a direct click on CustomButton, it might need preventDefault if we handle push manually
        e.preventDefault();
        router
          .push(`${path}#${sectionId}`, undefined, { scroll: false })
          .then(() => scrollToSectionAfterNavigate(sectionId));
      }
    },
    [router, solutionsLinks],
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 580, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Carousel
      ref={carouselRef}
      {...settings}
      className={`${styles.carousel} services-carousel`}
    >
      {solutionscarousel.map((solution, index) => {
        const solutionId =
          solution.id ??
          solution.title?.replace(/\s+/g, "-").toLowerCase() ??
          "";

        return (
          <div key={solutionId} className={styles.carouselSlide}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
                hover: { y: -10, transition: { duration: 0.3, ease: "easeInOut" } },
              }}
              className={styles.serviceCard}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.6 }}
                className={styles.serviceImageContainer}
              >
                <Image
                  src={solution.image?.node?.sourceUrl || ""}
                  alt={solution.image?.node?.altText || solution.title || ""}
                  fill
                  sizes="(max-width: 580px) 100vw, (max-width: 868px) 50vw, 33vw"
                  className={styles.serviceImage}
                />
              </motion.div>

              <div className={`${styles.cardContentWrapper} ${isRTL ? styles.cardContentWrapperRTL : ""}`}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
                  }}
                  className={`${styles.serviceContent} ${isRTL ? styles.serviceContentRTL : ""}`}
                >
                  <motion.h3
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, hover: { color: "#153E20" } }}
                    transition={{ duration: 0.5 }}
                    className={styles.serviceTitle}
                  >
                    {solution.title}
                  </motion.h3>
                  <motion.p
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, hover: { color: "#333", transition: { duration: 0.3 } } }}
                    transition={{ duration: 0.5 }}
                    className={styles.serviceDescription}
                  >
                    {solution.description}
                  </motion.p>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
                    <CustomButton
                      href={`/solutions#${solutionsLinks[index]?.key}`}
                      onClick={(e) => handleSolutionClick(e, index)}
                      className={styles.serviceButton}
                      aria-label={`${t("homeButtons.exploreMore")} - ${solution.title}`}
                    >
                      {t("homeButtons.exploreMore")}
                    </CustomButton>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </Carousel>
  );
}