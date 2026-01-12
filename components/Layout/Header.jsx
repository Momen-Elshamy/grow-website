import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Dropdown, Drawer, Menu } from "antd";
import { useRouter } from "next/router";
import { navLinks } from "../../_data/navigation";
import Uicons from "../UI/Uicons";
import CustomButton from "../UI/Button";
import styles from "./Header.module.css";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const router = useRouter();

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
          ),
        })),
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
      ),
    };
  });
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            Grow
          </Link>
          <nav className={styles.nav}>
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                const dropdownTrigger = (
                  <div
                    className={`${styles.navLink} ${
                      router.pathname === link.path ? styles.active : ""
                    } ${styles.dropdownTrigger}`}
                  >
                    <span className={styles.linkText}>{link.name}</span>
                    <span className={styles.iconWrapper}>
                      <Uicons icon="fi-rr-angle-small-down" />
                    </span>
                  </div>
                );
                return (
                  <Dropdown
                    key={link.path}
                    menu={{
                      items: link.children.map((child) => ({
                        key: child.key,
                        label: (
                          <Link
                            href={`${link.path}#${child.key}`}
                            className={styles.dropdownMenuItem}
                          >
                            {child.label}
                          </Link>
                        ),
                      })),
                    }}
                    placement="bottomLeft"
                    overlayClassName={styles.dropdownOverlay}
                    trigger={["hover", "click"]}
                    mouseEnterDelay={0.1}
                    mouseLeaveDelay={0.1}
                  >
                    {dropdownTrigger}
                  </Dropdown>
                );
              }
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${styles.navLink} ${
                    router.pathname === link.path ? styles.active : ""
                  }`}
                >
                  <span className={styles.linkText}>{link.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className={styles.actions}>
            <Link href="/contact" passHref>
              <CustomButton>Contact Us</CustomButton>
            </Link>
            <Button
              className="mobileMenuBtn"
              type="text"
              onClick={toggleMobileMenu}
              icon={
                <Uicons
                  icon={mobileMenuOpen ? "fi-rr-cross" : "fi-rr-menu-burger"}
                  color="#062A1A"
                />
              }
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
          header: { display: "none" },
          wrapper: { zIndex: 20001 },
        }}
        className={styles.mobileDrawer}
      >
        <div className={styles.mobileMenuHeader}>
          <Link
            href="/"
            className={styles.mobileLogo}
            onClick={closeMobileMenu}
          >
            Grow
          </Link>
          <Button
            type="text"
            className={styles.mobileCloseBtn}
            onClick={closeMobileMenu}
            icon={<Uicons icon="fi-rr-cross" />}
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
      </Drawer>
    </>
  );
}
