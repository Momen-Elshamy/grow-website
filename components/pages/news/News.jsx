import { useRef, useState } from "react";
import NewsHero from "./NewsHero";
import RecentNews from "./RecentNews";
import FeatureVideo from "./FeatureVideo";
import OtherNews from "./OtherNews";

export default function News({ newsPageData }) {
  const heroData = newsPageData?.hero;
  const newsData = newsPageData?.newsFields || [];
  const featureVideoData = newsPageData?.featureVideo;
  const recentNewsRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarCount, setSidebarCount] = useState(3);
  const [pinnedIndex, setPinnedIndex] = useState(null);

  const handleSelectNews = (index, source = "sidebar") => {
    setPinnedIndex(source === "otherNews" ? selectedIndex : null);
    setSidebarCount(source === "otherNews" ? 4 : 3);
    setSelectedIndex(index);
    requestAnimationFrame(() => {
      recentNewsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <main>
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
