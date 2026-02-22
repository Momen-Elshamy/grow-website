import React from "react";
import { Typography, Flex } from "antd";
import Uicons from "@/components/UI/Uicons";
import styles from "./CommitmentSection.module.css";
import Card from "./SolutionCard";

const { Text } = Typography;

// Section IDs matching header dropdown keys (nav) for scroll-to-card
const SOLUTION_SECTION_IDS = [
  "operation",
  "frp",
  "water",
  "training",
  "commercial",
];

export default function CommitmentSection({
  solutionsSection,
  solutionCardsData,
}) {
  const {
    title = "",
    description = "",
    icon,
    subtitle,
  } = solutionsSection || {};

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
            sectionId={SOLUTION_SECTION_IDS[index] ?? `card-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
