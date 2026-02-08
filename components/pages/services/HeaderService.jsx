import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "../../../_data/navigation";
import styles from "./HeaderService.module.css";
import { scrollToSection, scrollToSectionAfterNavigate } from "@/utils/scroll";

const SECTION_IDS =
  navLinks.find((l) => l.path === "/services")?.children?.map((c) => c.key) ?? [
    "consultancy",
    "lab",
    "training",
    "irrigation",
    "optimization",
    "remote-sensing",
  ];

export default function HeaderService({ headerService }) {
  const [activeService, setActiveService] = useState("");
  const router = useRouter();
  const services = headerService || [];

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    setActiveService(sectionId);
    if (typeof window !== "undefined" && router.pathname === "/services") {
      scrollToSection(sectionId, 140);
      scrollToSectionAfterNavigate(sectionId);
    } else {
      router
        .push(`/services#${sectionId}`, undefined, { scroll: false })
        .then(() => scrollToSectionAfterNavigate(sectionId));
    }
  };

  return (
    <header className={styles.headerService}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          {services.map((service, index) => {
            const sectionId = SECTION_IDS[index] ?? service.slug;
            return (
              <Link
                key={sectionId}
                href={`/services#${sectionId}`}
                scroll={false}
                onClick={(e) => handleClick(e, sectionId)}
                className={`${styles.navButton} ${
                  activeService === sectionId ? styles.active : ""
                }`}
              >
                <span className={styles.navLabel}>{service.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
