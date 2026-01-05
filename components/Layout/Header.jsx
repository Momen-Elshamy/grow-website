import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Dropdown } from "antd";
import { useRouter } from "next/router";
import { navLinks } from "../../_data/navigation";
import styles from "./Header.module.css";

export default function Header() {
   const [scrolled, setScrolled] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 20);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
         <div className={styles.container}>
            <Link href="/" className={styles.logo}>
               Grow
            </Link>

            <nav className={styles.nav}>
               {navLinks.map((link) => {
                  const linkContent = (
                     <Link
                        key={link.path}
                        href={link.path}
                        className={`${styles.navLink} ${router.pathname === link.path ? styles.active : ""}`}
                     >
                        <span className={styles.linkText}>{link.name}</span>
                        <span className={styles.iconWrapper}>
                           {link.hasDropdown && <i className="fi fi-rr-angle-small-down"></i>}
                        </span>
                     </Link>
                  );

                  if (link.hasDropdown) {
                     return (
                        <Dropdown
                           key={link.path}
                           menu={{ items: link.children }}
                           placement="bottom"
                           overlayClassName={styles.dropdownOverlay}
                        >
                           {linkContent}
                        </Dropdown>
                     );
                  }

                  return linkContent;
               })}
            </nav>

            <div className={styles.actions}>
               <Link href="/contact" passHref legacyBehavior>
                  <Button
                     type="primary"
                     size="large"
                     className="ctaButton"
                     icon={<i className="fi fi-rr-arrow-small-right" style={{ order: 1 }}></i>}
                     iconPosition="end"
                  >
                     Contact Us
                  </Button>
               </Link>

               <Button className="mobileMenuBtn" type="text" icon={<i className="fi fi-rr-menu-burger"></i>} />
            </div>
         </div>
      </header>
   );
}
