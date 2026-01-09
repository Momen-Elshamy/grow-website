import { Carousel, Flex, Button } from "antd";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "@/components/UI/Button";
import Uicons from "@/components/UI/Uicons";
import styles from "./HeroCarousel.module.css";

export default function CarouselComponent() {
  const carouselRef = useRef(null);

  // Array of images for the carousel
  const carouselImages = [
    {
      id: 1,
      image: "/images/hero/background-1.jpg", // Replace with your image path
      title: "Shaping.. A Future For Eco Farming & New Agriculture!",
      description:
        "Our Agriculture businesses deliver agronomic advice, services, and inputs to livestock, fruit, and vegetables. We also supply smart chain solutions to all businesses in all the primary food production fields.",
    },
    {
      id: 2,
      image: "/images/hero/background-2.webp", // Replace with your image path
      title: "Sustainable Agriculture Solutions",
      description:
        "Techniques that prioritize health of our land and customers within the regional agricultural market.",
    },
    {
      id: 3,
      image: "/images/hero/background-1.jpg", // Replace with your image path
      title: "100% Organic Products",
      description:
        "Delivering sustainable agriculture solutions for a better future.",
    },
  ];

  const next = () => {
    carouselRef.current?.next();
  };

  const prev = () => {
    carouselRef.current?.prev();
  };

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
        {carouselImages.map((slide, index) => (
          <div key={slide.id}>
            <div className={styles.slideContainer}>
              <Image
                src={slide.image}
                alt={slide.title}
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
                      <CustomButton>Explore Our Services</CustomButton>
                      <Button size="large" className={styles.aboutButton}>
                        About Us
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Flex>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Navigation Arrows */}
      <button
        onClick={prev}
        className={`${styles.navButton} ${styles.navButtonLeft}`}
      >
        <Uicons icon="fi-rr-angle-left" size="32px" color="white" />
      </button>
      <button
        onClick={next}
        className={`${styles.navButton} ${styles.navButtonRight}`}
      >
        <Uicons icon="fi-rr-angle-right" size="32px" color="white" />
      </button>
    </div>
  );
}
