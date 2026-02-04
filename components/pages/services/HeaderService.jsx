import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./HeaderService.module.css";

export default function HeaderService({ headerService }) {
  const [activeService, setActiveService] = useState("");
  const router = useRouter();
  const services = headerService || [];

  const scrollToSection = (slug) => {
    const el = document.getElementById(slug);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 120, left: 0, behavior: "smooth" });
    }
  };

  const handleClick = (e, slug) => {
    e.preventDefault();
    setActiveService(slug);
    if (typeof window !== "undefined" && router.pathname === "/services") {
      scrollToSection(slug);
    } else {
      router.push(`/services#${slug}`).then(() => {
        setTimeout(() => scrollToSection(slug), 100);
      });
    }
  };

  return (
    <header className={styles.headerService}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              scroll={false}
              onClick={(e) => handleClick(e, service.slug)}
              className={`${styles.navButton} ${
                activeService === service.slug ? styles.active : ""
              }`}
            >
              <span className={styles.navLabel}>{service.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
