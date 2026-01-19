import { motion } from "framer-motion";
import { Row, Col, Flex } from "antd";
import Uicons from "@/components/UI/Uicons";
import SuccessStoriesCarousel from "./SuccessStoriesCarousel";
import styles from "./SuccessStoriesCarousel.module.css";

export default function SuccessStories({ successStoriesData }) {
  const { title, subtitle, cards } = successStoriesData || {};

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
                <p className={styles.tagline}>{subtitle}</p>

                <h2 className={styles.heading}>{title}</h2>
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
          <SuccessStoriesCarousel cards={cards} />
        </motion.div>
      </div>
    </section>
  );
}
