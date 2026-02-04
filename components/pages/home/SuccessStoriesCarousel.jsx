import { useMemo, useState, useEffect, useRef } from "react";
import { Carousel, Card, Tag, Flex } from "antd";
import Image from "next/image";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import CustomButton from "@/components/UI/Button";
import styles from "./SuccessStoriesCarousel.module.css";
import Link from "next/link";

export default function SuccessStoriesCarousel({ cards = [] }) {
  const carouselRef = useRef(null);
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    afterChange: (current) => setCurrentSlide(current),
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
    <Carousel
      ref={carouselRef}
      {...settings}
      className={`${styles.carousel} carousel`}
    >
      {cards.map((course) => (
        <Link
          href={`/about?story=${encodeURIComponent(course?.title || "")}`}
          key={course.id}
          className={styles.slide}
        >
          <Card
            className={styles.card}
            variant="borderless"
            styles={{ body: { padding: 0 } }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={course.image?.node?.sourceUrl}
                alt={course.image?.node?.altText}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.courseImage}
              />
            </div>

            <div
              className={`${styles.contentWrapper} ${isRTL ? styles.contentWrapperRTL : ""}`}
            >
              <Flex vertical gap={12}>
                <Flex
                  key="tags"
                  gap={8}
                  wrap="wrap"
                  className={isRTL ? styles.tagsRTL : ""}
                >
                  {(course.contenttag ?? []).map((tag, tagIndex) => (
                    <Tag
                      key={tag?.id ?? tag?.title ?? `tag-${tagIndex}`}
                      className={styles.contentTag}
                    >
                      {tag.title}
                    </Tag>
                  ))}
                </Flex>
                <h3 key="title" className={styles.cardTitle}>
                  {course?.title}
                </h3>
                {course?.description && (
                  <p key="desc" className={styles.cardDescription}>
                    {course?.description}
                  </p>
                )}
              </Flex>
              <div
                className={`${styles.btnWrapper} ${isRTL ? styles.btnWrapperRTL : ""}`}
              >
                <CustomButton
                  className={styles.cardBtn}
                  aria-label={
                    course?.title
                      ? `Read more about ${course.title}`
                      : "Read more"
                  }
                  style={{
                    height: "100%",
                    borderRadius: isRTL ? "10px 0 0 10px" : "0 10px 10px 0",
                    border: "none",
                  }}
                />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </Carousel>
  );
}
