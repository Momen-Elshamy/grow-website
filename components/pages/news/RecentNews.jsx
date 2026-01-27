import React, { useEffect, useMemo, useState } from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./RecentNews.module.css";
import CustomButton from "@/components/UI/Button";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

export default function RecentNews({
  newsData,
  selectedIndex: controlledIndex,
  onSelectIndex,
  sectionRef,
  sidebarCount = 3,
  pinnedIndex = null,
}) {
  const { currentLang } = useLanguage();
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

  if (!newsData || !Array.isArray(newsData) || newsData.length === 0) {
    return null;
  }

  const normalizedNews = useMemo(
    () =>
      newsData
        .map((item) => item?.news?.news || item?.news || item)
        .filter(Boolean),
    [newsData]
  );

  const [uncontrolledIndex, setUncontrolledIndex] = useState(0);
  const selectedIndex =
    controlledIndex !== undefined ? controlledIndex : uncontrolledIndex;
  const setSelectedIndex = onSelectIndex || setUncontrolledIndex;
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState(null);
  const selectedNews = normalizedNews[selectedIndex] || normalizedNews[0];
  const selectedImage = selectedNews?.relatedImages?.[0]?.image?.node;
  const sidebarNews = (() => {
    const list = [];
    if (
      pinnedIndex !== null &&
      pinnedIndex !== selectedIndex &&
      normalizedNews[pinnedIndex]
    ) {
      list.push(normalizedNews[pinnedIndex]);
    }

    normalizedNews.forEach((item, index) => {
      if (index === selectedIndex || index === pinnedIndex) return;
      list.push(item);
    });

    return list.slice(0, sidebarCount);
  })();
  const hasExtendedContent =
    Boolean(selectedNews?.readMoreDescription) ||
    (selectedNews?.relatedImages || []).length > 0;

  if (!selectedNews) {
    return null;
  }

  useEffect(() => {
    setIsExpanded(false);
  }, [selectedIndex]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };

    if (currentLang === "ar") {
      // If WordPress sent a pre-formatted Arabic date (e.g. "4 سبتمبر 2025"), parsing fails — show it as-is.
      if (Number.isNaN(date.getTime())) return dateString;
      try {
        const s = new Intl.DateTimeFormat("ar-EG", options).format(date);
        if (s && s.length > 0) return s;
      } catch {
        /* ar-EG not available */
      }
      try {
        const s = new Intl.DateTimeFormat("ar", options).format(date);
        if (s && s.length > 0) return s;
      } catch {
        /* fallback */
      }
      return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <section
      id="recent-news"
      className={styles.section}
      ref={sectionRef}
      aria-labelledby="recent-news-heading"
      data-section="recent-news"
    >
      <div className={styles.container}>
        <motion.h2
          id="recent-news-heading"
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("recentNews")}
        </motion.h2>

        <Row gutter={[24, 24]} className={styles.layout}>
          <Col xs={24} lg={16}>
            <motion.article
              className={`${styles.newsCard} ${styles.featuredCard}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {selectedImage?.sourceUrl && (
                <div className={`${styles.imageWrapper} ${styles.featuredImageWrapper}`}>
                  <Image
                    src={selectedImage.sourceUrl}
                    alt={selectedImage.altText || selectedNews.title}
                    width={640}
                    height={420}
                    className={styles.newsImage}
                  />
                  {selectedNews.tags && selectedNews.tags.length > 0 && (
                    <div className={styles.imageTags}>
                      {selectedNews.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
                    <div className={styles.content}>
                      <p className={styles.date}>{formatDate(selectedNews.date)}</p>
                <h3 className={styles.newsTitle}>{selectedNews.title}</h3>
                <p
                  className={`${styles.description} ${
                    isExpanded ? styles.expandedDescription : styles.featuredDescription
                  }`}
                >
                  {selectedNews.description}
                </p>
                {isExpanded && (
                  <>
                    {selectedNews.relatedImages?.length > 0 && (
                      <div className={styles.relatedImages}>
                        {selectedNews.relatedImages.map((imageItem, index) => {
                          const relatedNode = imageItem?.image?.node;
                          if (!relatedNode?.sourceUrl) return null;

                          return (
                            <div key={index} className={styles.relatedImageWrapper}>
                              <Image
                                src={relatedNode.sourceUrl}
                                alt={relatedNode.altText || selectedNews.title}
                                width={180}
                                height={140}
                                className={styles.relatedImage}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {selectedNews.readMoreDescription && (
                      <p className={styles.readMoreDescription}>
                        {selectedNews.readMoreDescription}
                      </p>
                    )}
                    <CustomButton
                      type="button"
                      className={styles.readMoreButton}
                      onClick={() => setIsExpanded(false)}
                    >
                      {t("readLess")}
                    </CustomButton>
                  </>
                )}
                {hasExtendedContent && !isExpanded && (
                  <CustomButton
                    type="button"
                    className={styles.readMoreButton}
                    onClick={() => setIsExpanded(true)}
                  >
                    {t("readMore")}
                  </CustomButton>
                )}
              </div>
            </motion.article>
            <div className={styles.mobileList}>
              {sidebarNews.map((item, index) => {
                const listImage = item?.relatedImages?.[0]?.image?.node;
                const itemIndex = normalizedNews.indexOf(item);
                const isActive = itemIndex === selectedIndex;
                const isMobileExpanded = expandedMobileIndex === itemIndex;
                const mobileHasExtendedContent =
                  Boolean(item?.readMoreDescription) ||
                  (item?.relatedImages || []).length > 0;

                return (
                  <div
                    key={`${item?.title || index}-mobile`}
                    className={`${styles.newsCard} ${styles.mobileCard} ${
                      isActive ? styles.activeMobileCard : ""
                    }`}
                  >
                    {listImage?.sourceUrl && (
                      <div
                        className={`${styles.imageWrapper} ${styles.featuredImageWrapper} ${styles.mobileImageWrapper}`}
                      >
                        <Image
                          src={listImage.sourceUrl}
                          alt={listImage.altText || item.title}
                          width={640}
                          height={420}
                          className={styles.newsImage}
                        />
                        {item.tags && item.tags.length > 0 && (
                          <div className={styles.imageTags}>
                            {item.tags.slice(0, 4).map((tag, tagIndex) => (
                              <span key={tagIndex} className={styles.tag}>
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <div className={styles.content}>
                      <p className={styles.date}>{formatDate(item.date)}</p>
                      <h3 className={styles.newsTitle}>{item.title}</h3>
                      <p
                        className={`${styles.description} ${
                          isMobileExpanded
                            ? styles.expandedDescription
                            : styles.featuredDescription
                        }`}
                      >
                        {item.description}
                      </p>
                      {isMobileExpanded && (
                        <>
                          {item.relatedImages?.length > 0 && (
                            <div className={styles.relatedImages}>
                              {item.relatedImages.map((imageItem, imageIndex) => {
                                const relatedNode = imageItem?.image?.node;
                                if (!relatedNode?.sourceUrl) return null;

                                return (
                                  <div
                                    key={imageIndex}
                                    className={styles.relatedImageWrapper}
                                  >
                                    <Image
                                      src={relatedNode.sourceUrl}
                                      alt={relatedNode.altText || item.title}
                                      width={180}
                                      height={140}
                                      className={styles.relatedImage}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {item.readMoreDescription && (
                            <p className={styles.readMoreDescription}>
                              {item.readMoreDescription}
                            </p>
                          )}
                          <CustomButton
                            type="button"
                            className={styles.readMoreButton}
                            onClick={() => setExpandedMobileIndex(null)}
                          >
                            {t("readLess")}
                          </CustomButton>
                        </>
                      )}
                      {!isMobileExpanded && mobileHasExtendedContent && (
                        <CustomButton
                          type="button"
                          className={styles.readMoreButton}
                          onClick={() => setExpandedMobileIndex(itemIndex)}
                        >
                          {t("readMore")}
                        </CustomButton>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xs={24} lg={8} className={styles.sidebar}>
            <div className={styles.list}>
              <h3 className={styles.listTitle}>{t("recentPosts")}</h3>
              {sidebarNews.map((item, index) => {
                const listImage = item?.relatedImages?.[0]?.image?.node;
                const itemIndex = normalizedNews.indexOf(item);
                const isActive = itemIndex === selectedIndex;

                return (
                  <button
                    key={item?.title || index}
                    type="button"
                    className={`${styles.listItem} ${
                      isActive ? styles.activeListItem : ""
                    } ${currentLang === "ar" ? styles.listItemRTL : ""}`}
                    dir={currentLang === "ar" ? "rtl" : undefined}
                    onClick={() => {
                      if (itemIndex !== -1) {
                        setSelectedIndex(itemIndex, "sidebar");
                      }
                    }}
                  >
                    {listImage?.sourceUrl && (
                      <div className={styles.listItemImageWrapper}>
                        <Image
                          src={listImage.sourceUrl}
                          alt={listImage.altText || item.title}
                          width={96}
                          height={96}
                          className={styles.listItemImage}
                        />
                      </div>
                    )}
                    <div
                      className={`${styles.listItemContent} ${
                        currentLang === "ar" ? styles.listItemContentRTL : ""
                      }`}
                      dir={currentLang === "ar" ? "rtl" : undefined}
                    >
                      <p
                        className={`${styles.date} ${styles.listItemDate} ${
                          currentLang === "ar" ? styles.listItemDateRTL : ""
                        }`}
                        dir={currentLang === "ar" ? "rtl" : undefined}
                      >
                        {formatDate(item.date)}
                      </p>
                      <h4 className={styles.listItemTitle}>{item.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
