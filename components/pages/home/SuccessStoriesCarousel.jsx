import { Carousel, Card, Tag, Flex } from "antd";
import Image from "next/image";
import CustomButton from "@/components/UI/Button";
import styles from "./SuccessStoriesCarousel.module.css";

export default function SuccessStoriesCarousel({ data = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    draggable: false,
    swipe: false,
    touchMove: false,
    centerMode: true,
    centerPadding: "15%",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "5%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "5%",
        },
      },
    ],
  };

  return (
    <Carousel {...settings} className={`${styles.carousel} carousel`}>
      {data.map((course) => (
        <div key={course.id} className={styles.slide}>
          <Card
            className={styles.card}
            bordered={false}
            styles={{ body: { padding: 0 } }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.courseImage}
              />
            </div>

            <div className={styles.contentWrapper}>
              <Flex vertical gap={12}>
                <Flex gap={8} wrap="wrap">
                  {course.tags.map((tag) => (
                    <Tag key={tag} className={styles.contentTag}>
                      {tag}
                    </Tag>
                  ))}
                </Flex>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                {course.description && (
                  <p className={styles.cardDescription}>{course.description}</p>
                )}
              </Flex>
              <div className={styles.btnWrapper}>
                <CustomButton
                  className={styles.cardBtn}
                  style={{
                    height: "100%",
                    borderRadius: "0 10px 10px 0",
                    border: "none",
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </Carousel>
  );
}
