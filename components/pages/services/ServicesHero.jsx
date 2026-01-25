import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "antd";
import CustomButton from "@/components/UI/Button";
import styles from "./ServicesHero.module.css";
import Link from "next/link";

export default function ServicesHero({ heroData }) {
  const { title, description, image, altImage } = heroData || {};
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.imageWrapper}>
        <Image
          src={image?.node?.sourceUrl}
          alt={altImage}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textWrapper}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.title}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.description}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.buttonGroup}
          >
            {" "}
            <Link href="/contact" className={styles.contactBtnLink}>
              <CustomButton className={styles.transparentBtn} >
                Contact Us
              </CustomButton>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.breadcrumbWrapper}
        >
          <Breadcrumb
            className={styles.breadcrumb}
            separator={<span className={styles.separator}>&gt;</span>}
            items={[
              {
                title: <Link href="/">Home</Link>,
              },
              {
                title: <span className={styles.current}>services</span>,
              },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}
