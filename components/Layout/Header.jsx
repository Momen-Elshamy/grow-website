import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Dropdown, Drawer, Menu } from "antd";
import { useRouter } from "next/router";
import { navLinks } from "../../_data/navigation";
import Uicons from "../UI/Uicons";
import CustomButton from "../UI/Button";
import styles from "./Header.module.css";
import Image from "next/image";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

const languages = [
  { key: "en", flag: "/images/flags/united-states.png" },
  { key: "ar", flag: "/images/flags/saudi-arabia.png" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const router = useRouter();
  const { currentLang, changeLanguage } = useLanguage();

  const handleLanguageChange = ({ key }) => {
    changeLanguage(key);
  };

  const currentLanguage = languages.find((lang) => lang.key === currentLang) || languages[0];
  
  // Translation function: t("key") or t("nested.key") returns value or key as fallback
  const t = useMemo(() => {
    const dict = currentLang === "ar" ? ar : en;
    return (key) => {
      const keys = key.split(".");
      let val = dict;
      for (const k of keys) {
        val = val?.[k];
      }
      return val ?? key;
    };
  }, [currentLang]);

  const getNavLabel = useCallback((linkName) => t(linkName), [t]);
  const getChildLabel = useCallback((linkName, childKey) => t(`${linkName}Children.${childKey}`), [t]);

  const menuItems = languages
    .filter((lang) => lang.key !== currentLang)
    .map((lang) => ({
      key: lang.key,
      label: (
          <span style={{display : "flex" , justifyContent : "center"}} >
            <Image
              src={lang?.flag}
              alt={lang?.label}
              width={32}
              height={32} 
              className={styles.flag}
            />
          </span>
      ),
    }));
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
  const mobileMenuItems = useMemo(() => {
    return navLinks.map((link) => {
      if (link.hasDropdown) {
        return {
          key: link.path,
          label: <span className={styles.menuLabel}>{getNavLabel(link.name)}</span>,
          children: link.children.map((child) => ({
            key: `${link.path}#${child.key}`,
            label: (
              <Link
                href={`${link.path}#${child.key}`}
                onClick={closeMobileMenu}
                className={styles.menuChildLink}
              >
                {getChildLabel(link.name, child.key)}
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
            {getNavLabel(link.name)}
          </Link>
        ),
      };
    });
  }, [currentLang, getNavLabel, getChildLabel]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            {/* Grow */}
            <Image
              src="/images/logo1.png"
              alt="Grow Logo"
              width={90}
              height={40}
              className={styles.logoImage}
            />
          </Link>
          <nav className={styles.nav}>
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                const dropdownTrigger = (
                  <Link
                    href={link.path}
                    className={`${styles.navLink} ${
                      router.pathname === link.path ? styles.active : ""
                    } ${styles.dropdownTrigger}`}
                  >
                    <span className={styles.linkText}>{getNavLabel(link.name)}</span>
                    <span className={styles.iconWrapper}>
                      <Uicons icon="fi-rr-angle-small-down" />
                    </span>
                  </Link>
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
                            {getChildLabel(link.name, child.key)}
                          </Link>
                        ),
                      })),
                    }}
                    placement={currentLang === "ar" ? "bottomRight" : "bottomLeft"}
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
                  <span className={styles.linkText}>{getNavLabel(link.name)}</span>
                </Link>
              );
            })}
          </nav>
          <div className={styles.actions}>
          <Dropdown
                  menu={{ items: menuItems, onClick: handleLanguageChange }}
                  trigger={["click"]}
                >
              <CustomButton icon="" className={styles.languageButton} type="text">
                  <span>
                    <Image
                      src={currentLanguage.flag}
                      alt="language flag"
                      width={32}
                      height={32} 
                      className={styles.flag}
                    />
                  </span>
              </CustomButton>
           </Dropdown>
            <Link href="/contact" passHref className={styles.contactUsButton}>
              <CustomButton>{t("contactUs")}</CustomButton>
            </Link>


            <Button
              className="mobileMenuBtn"
              type="text"
              onClick={toggleMobileMenu}
              icon={
                <Uicons
                  icon={mobileMenuOpen ? "fi-rr-cross" : "fi-rr-menu-burger"}
                  color="#17311E"
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
                  <Link href="/contact" passHref className={styles.contactUsLinkMenu}>
            <CustomButton className={styles.contactUsButtonMenu}>{t("contactUs")}</CustomButton>
        </Link>
      </Drawer>
    </>
  );
}
