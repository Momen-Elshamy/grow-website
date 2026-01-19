import { Button, Carousel, Flex } from "antd";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "@/components/UI/Button";
import Uicons from "@/components/UI/Uicons";
import styles from "./HeroCarousel.module.css";

export default function CarouselComponent({ heroDetails }) {
  const carouselRef = useRef(null);

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
              <div className={styles.overlay} />

              {/* Content */}
              <Flex
                className={styles.contentRow}
                align="center"
                justify="flex-start"
              >
                <div className={styles.contentCol}>
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
                      <CustomButton href="/services">Explore Our Services</CustomButton>
                      <CustomButton href="/about" className={styles.aboutButton} icon={null}>
                        About Us
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
        { onClick: prev, icon: "fi-rr-angle-left", className: styles.navButtonLeft },
        { onClick: next, icon: "fi-rr-angle-right", className: styles.navButtonRight },
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
