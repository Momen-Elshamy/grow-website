import { motion } from "framer-motion";
import { Row, Col, Flex } from "antd";
import Uicons from "@/components/UI/Uicons";
import CoursesCarousel from "./CoursesCarousel";
import styles from "./CoursesCarousel.module.css";
import Image from "next/image";

const COURSES_DATA = [
  {
    id: 1,
    image: "/images/courses/project-3.webp",
    tags: ["Agriculture", "Greenhouse"],
    title: "Advancing vertical farming with urban crop solutions",
    description:
      "Innovative urban farming solutions to maximize crop yields in limited spaces using vertical technology.",
  },
  {
    id: 2,
    image: "/images/courses/project-5.webp",
    tags: ["Agriculture", "Greenhouse"],
    title: "Controlled environment in agriculture growing hype",
    description:
      "Discover the latest trends in climate-controlled greenhouses for sustainable year-round production.",
  },
  {
    id: 3,
    image: "/images/solutions/banner-process.webp",
    tags: ["Climate", "Farmers"],
    title: "How to help farmers break their financial barriers?",
    description:
      "Over the last few years, we have witnessed a steady rise in demand for locally sourced food, restaurants are growing their own food even.",
  },
  {
    id: 4,
    image: "/images/courses/project-5.webp",
    tags: ["Farming", "Food"],
    title: "Future of food production in smart new indoor farming",
    description:
      "Smart technology integration in indoor farming to ensure food security and sustainable growth.",
  },
];

const Courses = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Row justify="center">
              <Col xs={24} md={18} lg={12}>
                <p className={styles.tagline}>
                Build Your Future with Agriculture Courses
                </p>

                <h2 className={styles.heading}>
                  Explore our courses and <br /> latest success stories.
                </h2>
                <Flex
                  justify="center"
                  gap={10}
                  className={styles.iconContainer}
                >
                  <Uicons icon="fi-rr-leaf" color="#107634" />
                  <Uicons
                    icon="fi-rr-leaf"
                    color="#107634"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </Flex>
              </Col>
            </Row>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CoursesCarousel data={COURSES_DATA} />
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
