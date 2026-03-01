"use client";

import React, { useEffect, useMemo } from "react";
import { Typography, Flex } from "antd";
import { useRouter } from "next/router";
import Uicons from "@/components/UI/Uicons";
import { navLinks } from "@/src/../_data/navigation";
import styles from "./CommitmentSection.module.css";
import Card from "./SolutionCard";

const { Text } = Typography;

export default function CommitmentSection({ solutionsSection, solutionCardsData }) {
  const router = useRouter();
  const { title = "", description = "", icon, subtitle } = solutionsSection || {};

  const solutionsLinks = useMemo(() => {
    return navLinks.find((link) => link.name === "solutions")?.children || [];
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

  // Scroll to the card based on hash or query parameter
  useEffect(() => {
    if (!router.isReady) return;

    const hash = window.location.hash.replace("#", "");
    const solutionQuery = Array.isArray(router.query.solution)
      ? router.query.solution[0]
      : router.query.solution;

    const targetId = hash || (solutionQuery ? decodeURIComponent(solutionQuery).toLowerCase().trim().replace(/\s+/g, "-") : null);

    if (!targetId) return;

    const element = document.getElementById(targetId);

    if (element) {
      const timeoutId = setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [router.isReady, router.query.solution, router.asPath]);

  return (
    <section className={styles.container}>
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
        {mappedSolutions.map((solution, index) => (
          <Card
            key={solution.id}
            solution={solution}
            sectionId={solutionsLinks[index]?.key || `solution-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
