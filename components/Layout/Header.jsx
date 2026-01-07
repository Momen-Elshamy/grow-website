import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Dropdown, Drawer, Menu } from "antd";
import { useRouter } from "next/router";
import { navLinks } from "../../_data/navigation";
import styles from "./Header.module.css";
export default function Header() {
   const [scrolled, setScrolled] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [expandedKeys, setExpandedKeys] = useState([]);
   const router = useRouter();
   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);
   const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
   };
   const closeMobileMenu = () => {
      setMobileMenuOpen(false);
      setExpandedKeys([]);
   };
   const handleOpenChange = (keys) => {
      setExpandedKeys(keys);
   };
   // Build menu items for mobile drawer
   const mobileMenuItems = navLinks.map((link) => {
      if (link.hasDropdown) {
         return {
            key: link.path,
            label: <span className={styles.menuLabel}>{link.name}</span>,
            children: link.children.map((child) => ({
               key: `${link.path}#${child.key}`,
               label: (
                  <Link
                     href={`${link.path}#${child.key}`}
                     onClick={closeMobileMenu}
                     className={styles.menuChildLink}
                  >
                     {child.label}
                  </Link>
               )
            }))
         };
      }
      return {
         key: link.path,
         label: (
            <Link
               href={link.path}
               onClick={closeMobileMenu}
               className={styles.menuLabel}
            >
               {link.name}
            </Link>
         )
      };
   });
   return (
      <>
         <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} >
            <div className={styles.container}>
               <Link href="/" className={styles.logo}>
                  Grow
               </Link>
               <nav className={styles.nav}>
                  {navLinks.map((link) => {
                     if (link.hasDropdown) {
                        const dropdownTrigger = (
                           <div
                              className={`${styles.navLink} ${router.pathname === link.path ? styles.active : ""} ${styles.dropdownTrigger}`}
                           >
                              <span className={styles.linkText}>{link.name}</span>
                              <span className={styles.iconWrapper}>
                                 <i className="fi fi-rr-angle-small-down"></i>
                              </span>
                           </div>
                        );
                        return (
                           <Dropdown
                              key={link.path}
                              menu={{
                                 items: link.children.map(child => ({
                                    key: child.key,
                                    label: (
                                       <Link href={`${link.path}#${child.key}`} className={styles.dropdownMenuItem}>
                                          {child.label}
                                       </Link>
                                    )
                                 }))
                              }}
                              placement="bottom"
                              overlayClassName={styles.dropdownOverlay}
                              trigger={['click']}
                           >
                              {dropdownTrigger}
                           </Dropdown>
                        );
                     }
                     return (
                        <Link
                           key={link.path}
                           href={link.path}
                           className={`${styles.navLink} ${router.pathname === link.path ? styles.active : ""}`}
                        >
                           <span className={styles.linkText}>{link.name}</span>
                        </Link>
                     );
                  })}
               </nav>
               <div className={styles.actions}>
                  <Link href="/contact" passHref legacyBehavior>
                     <Button
                        type="primary"
                        className="ctaButton"
                        icon={<i className="fi fi-rr-arrow-small-right" style={{ order: 1 }}></i>}
                        iconPosition="end"
                     >
                        Contact Us
                     </Button>
                  </Link>
                  <Button
                     className="mobileMenuBtn"
                     type="text"
                     onClick={toggleMobileMenu}
                     icon={<i style={{ color: "#062A1A"}} className={mobileMenuOpen ? "fi fi-rr-cross" : "fi fi-rr-menu-burger"}></i>}
                  />
               </div>
            </div>
         </header>
         {/* Mobile Menu Drawer */}
         <Drawer
            placement="right"
            onClose={closeMobileMenu}
            open={mobileMenuOpen}
            width="85%"
            zIndex={20001}
            styles={{
               body: { padding: 0 },
               header: { display: 'none' },
               wrapper: { zIndex: 20001 }
            }}
            className={styles.mobileDrawer}
         >
            <div className={styles.mobileMenuHeader}>
               <Link href="/" className={styles.mobileLogo} onClick={closeMobileMenu}>
                  Grow
               </Link>
               <Button
                  type="text"
                  className={styles.mobileCloseBtn}
                  onClick={closeMobileMenu}
                  icon={<i className="fi fi-rr-cross"></i>}
               />
            </div>
            <Menu
               mode="inline"
               selectedKeys={[router.pathname]}
               openKeys={expandedKeys}
               onOpenChange={handleOpenChange}
               className={styles.mobileMenu}
               items={mobileMenuItems}
            />
            <div className={styles.mobileActions}>
               <Link href="/contact" onClick={closeMobileMenu}>
                  <Button
                     type="primary"
                     className="ctaButton"
                     icon={<i className="fi fi-rr-arrow-small-right" style={{ order: 1 }}></i>}
                     iconPosition="end"
                     block
                  >
                     Contact Us
                  </Button>
               </Link>
            </div>
         </Drawer>
      </>
   );
}