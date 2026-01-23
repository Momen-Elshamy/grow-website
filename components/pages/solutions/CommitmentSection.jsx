import React, { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import { Typography, Flex } from "antd";
import Uicons from "@/components/UI/Uicons";
import styles from "./CommitmentSection.module.css";
import Card from "./SolutionCard";
import Lenis from "lenis";

const { Text } = Typography;

export default function CommitmentSection({ solutionsSection, solutionCardsData}) {
  const { title = "", description = "", icon, subtitle } = solutionsSection || {};
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!lenisRef.current) {
      const lenis = new Lenis();
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Map GraphQL solutionCards data to Card component structure
  const mappedSolutions =
    solutionCardsData?.map((card, index) => ({
      id: index + 1,
      number: String(index + 1).padStart(2, "0"),
      title: card.title,
      description: card.description,
      features:
        card.iconSection?.map((item) => ({
          textIcon: item.textIcon,
          icon: item.icon,
        })) || [],
      image: card.image?.node?.sourceUrl,
      altImage: card.altImage,
    })) || [];

  return (
    <section className={styles.container} ref={container}>
      <Flex vertical gap={24} className={styles.header}>
        <div className={styles.contentWrapper}>
          <Flex align="center" gap="small" className={styles.subtitleWrapper}>
            <Uicons icon={icon} className={styles.subtitleIcon} />
            <Text className={styles.subtitle}>{subtitle}</Text>
          </Flex>
          <h2 className={styles.mainHeading}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </Flex>

      <div className={styles.cardsContainer}>
        {mappedSolutions.map((solution, i) => {
          // Scale logic: The last card stays 100%, previous ones scale down to look like they are "behind"
          const targetScale = 1 - (mappedSolutions.length - 1 - i) * 0.05;
          return (
            <Card
              key={solution.id}
              solution={solution}
              index={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
