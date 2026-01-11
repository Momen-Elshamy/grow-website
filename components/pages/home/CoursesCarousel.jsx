import { Carousel, Card, Tag, Flex } from "antd";
import Image from "next/image";
import CustomButton from "@/components/UI/Button";
import styles from "./CoursesCarousel.module.css";

const CoursesCarousel = ({ data = [] }) => {
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
    centerPadding: "10%",
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
            <Image
              src={course.image}
              alt={course.title}
              className={styles.courseImage}
              width={100}
              height={100}
            />

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
};

export default CoursesCarousel;
