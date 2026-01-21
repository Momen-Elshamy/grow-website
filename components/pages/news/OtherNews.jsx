import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./OtherNews.module.css";
import CustomButton from "@/components/UI/Button";

export default function OtherNews({ newsData, onSelectNews }) {
  if (!newsData || !Array.isArray(newsData)) {
    return null;
  }

  const normalizedNews = useMemo(
    () =>
      newsData
        .map((item) => item?.news?.news || item?.news || item)
        .filter(Boolean),
    [newsData]
  );

  const otherNewsItems = normalizedNews.slice(4);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const track = sliderRef.current;
    if (!track) return;

    const updateScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      const hasOverflow = maxScrollLeft > 4;
      setCanScrollLeft(hasOverflow && track.scrollLeft > 4);
      setCanScrollRight(hasOverflow && track.scrollLeft < maxScrollLeft - 4);
    };

    updateScrollState();
    track.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [otherNewsItems.length]);

  if (otherNewsItems.length === 0) {
    return null;
  }

  const shouldCenter = otherNewsItems.length < 3;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>More News</h2>
        </div>

        <div className={styles.slider}>
          <CustomButton
            type="button"
            icon="fi-rr-arrow-small-left"
            iconColor={canScrollLeft ? "#fff" : "#1f1f1f"}
            className={`${styles.arrow} ${
              canScrollLeft ? styles.arrowActive : styles.arrowDisabled
            }`}
            aria-label="Previous news"
            aria-disabled={!canScrollLeft}
            onClick={() =>
              sliderRef.current?.scrollBy({
                left: -sliderRef.current.clientWidth,
                behavior: "smooth",
              })
            }
          >
          </CustomButton>
          <div
            className={`${styles.track} ${
              shouldCenter ? styles.trackCentered : ""
            }`}
            ref={sliderRef}
          >
            {otherNewsItems.map((item, index) => {
              const imageNode = item?.relatedImages?.[0]?.image?.node;
              const itemIndex = index + 4;
              return (
                <motion.article
                  key={item?.title || index}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => onSelectNews?.(itemIndex, "otherNews")}
                  role={onSelectNews ? "button" : undefined}
                  tabIndex={onSelectNews ? 0 : undefined}
                  onKeyDown={(event) => {
                    if (!onSelectNews) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectNews(itemIndex, "otherNews");
                    }
                  }}
                >
                  <div className={styles.imageWrapper}>
                    {imageNode?.sourceUrl && (
                      <Image
                        src={imageNode.sourceUrl}
                        alt={imageNode.altText || item.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    {item?.tags && item.tags.length > 0 && (
                      <div className={styles.tagBadge}>
                        {item.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className={styles.tagBadgeItem}>
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </motion.article>
              );
            })}
          </div>
          <CustomButton
            type="button"
            icon="fi-rr-arrow-small-right"
            iconColor={canScrollRight ? "#fff" : "#1f1f1f"}
            className={`${styles.arrow} ${canScrollRight ? styles.arrowActive : styles.arrowDisabled}`}
            onClick={() => sliderRef.current?.scrollBy({ left: sliderRef.current.clientWidth, behavior: "smooth" })}
          >
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
