import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HeaderService.module.css";

export default function HeaderService({ headerService }) {
  const [activeService, setActiveService] = useState("");

 
  const services = headerService || [];

  const handleClick = (slug) => {
    setActiveService(slug);
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
              onClick={() => handleClick(service.slug)}
              className={`${styles.navButton} ${
                activeService === service.slug ? styles.active : ""
              }`}
            >
              <span className={styles.navLabel}>
                {service.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
