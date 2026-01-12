import { Carousel } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomButton from "@/components/UI/Button";
import styles from "./Services.module.css";

export default function ServiceCarousel({ services }) {
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
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]}
    >
      {services.map((service, index) => (
        <div key={service.id} className={styles.carouselSlide}>
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
                src={service.image}
                alt={service.title}
                fill
                className={styles.serviceImage}
              />
            </motion.div>

            <div className={styles.cardContentWrapper}>
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
                className={styles.serviceContent}
              >
                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    hover: {
                      color: "#107634",
                    },
                  }}
                  transition={{ duration: 0.5 }}
                  className={styles.serviceTitle}
                >
                  {service.title}
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
                  {service.description}
                </motion.p>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <CustomButton className={styles.serviceButton}>
                    Explore More
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
