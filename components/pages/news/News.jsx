import { useRef, useState, useMemo, useEffect } from "react";
import NewsHero from "./NewsHero";
import RecentNews from "./RecentNews";
import FeatureVideo from "./FeatureVideo";
import OtherNews from "./OtherNews";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { scrollToSection } from "@/utils/scroll";

export default function News({
  newsPageData,
  newsPageDataArabic,
}) {
  const { currentLang } = useLanguage();
  const newsPageDataToUse = useMemo(() => {
    if (currentLang === "ar") {
      return newsPageDataArabic || newsPageData || null;
    }
    return newsPageData || null;
  }, [currentLang, newsPageData, newsPageDataArabic]);

  const heroData = newsPageDataToUse?.hero;
  const newsData = newsPageDataToUse?.newsFields || [];
  const featureVideoData = newsPageDataToUse?.featureVideo;
  const recentNewsRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarCount, setSidebarCount] = useState(3);
  const [pinnedIndex, setPinnedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(0);
    setPinnedIndex(null);
  }, [currentLang]);

  const handleSelectNews = (index, source = "sidebar") => {
    setPinnedIndex(source === "otherNews" ? selectedIndex : null);
    setSidebarCount(source === "otherNews" ? 4 : 3);
    setSelectedIndex(index);
    requestAnimationFrame(() => {
      scrollToSection("recent-news");
    });
  };

  // Only one "Recent News" section — show content for the current language only.
  // key on main forces a single block; changing language replaces it instead of adding a second.
  return (
    <main key={currentLang}>
      <NewsHero heroData={heroData} />
      <RecentNews
        newsData={newsData}
        selectedIndex={selectedIndex}
        onSelectIndex={handleSelectNews}
        sectionRef={recentNewsRef}
        sidebarCount={sidebarCount}
        pinnedIndex={pinnedIndex}
      />
      <FeatureVideo featureVideoData={featureVideoData} />
      <OtherNews newsData={newsData} onSelectNews={handleSelectNews} />
    </main>
  );
}
