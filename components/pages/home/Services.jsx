import { Carousel, Row, Col, Flex } from "antd";
import Image from "next/image";
import CustomButton from "@/components/UI/Button";
import Uicons from "@/components/UI/Uicons";
import styles from "./Services.module.css";

export default function Services() {
  const services = [
    {
      id: 1,
      image: "/images/Hero/background1.jpg",
      icon: "fi-rr-shopping-bag",
      title: "Seed Supply and Distribution",
      description:
        "We have dedicated resources that will meet your huge seed storage and all distribution needs to assure a ready seed supply on tim...",
    },
    {
      id: 2,
      image: "/images/Hero/background1.jpg",
      icon: "fi-rr-house-tree",
      title: "Soil Health and Management",
      description:
        "Soil health refers to the soil's capacity to function as vital living ecosystem that lead to a huge productivity system success for your farm.",
    },
    {
      id: 3,
      image: "/images/Hero/background1.jpg",
      icon: "fi-rr-faucet",
      title: "Crop Irrigation Management",
      description:
        "Water is a precious resource for humanity and it makes sense to optimize it's use by technology and scheduling water applied to a field.",
    },
    {
      id: 4,
      image: "/images/Hero/background1.jpg",
      icon: "fi-rr-chart-line-up",
      title: "Yield Analysis",
      description:
        "Comprehensive yield analysis to help you understand crop performance and optimize your farming strategies for maximum productivity.",
    },
    {
      id: 5,
      image: "/images/Hero/background1.jpg",
      icon: "fi-rr-droplet",
      title: "Irrigation Management",
      description:
        "Smart irrigation solutions that help you manage water resources efficiently and ensure optimal crop growth throughout the season.",
    },
    {
      id: 6,
      image: "/images/Hero/background1.jpg",
      icon: "fi-rr-seedling",
      title: "Organic Certification",
      description:
        "Expert guidance through the organic certification process, ensuring your farm meets all standards and requirements for organic production.",
    },
  ];

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.servicesWrapper}>
        <div className={styles.headerSection}>
          <p className={styles.subtitle}>
            Let's start your farming journey together!
          </p>
          <h2 className={styles.mainTitle}>
            Innovative solutions for agriculture optimal crops growth & soil
            health.
          </h2>
          <div className={styles.leafIconContainer}>
            <Uicons icon="fi-rr-leaf" size="20px" color="#107634" />
            <Uicons
              icon="fi-rr-leaf"
              size="20px"
              color="#107634"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </div>
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
              breakpoint: 768,
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
          {services.map((service) => (
            <div key={service.id} className={styles.carouselSlide}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceImageContainer}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className={styles.serviceImage}
                  />
                </div>

                <div className={styles.cardContentWrapper}>
                  <div className={styles.serviceContent}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                    <CustomButton className={styles.serviceButton}>
                      Explore More
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
