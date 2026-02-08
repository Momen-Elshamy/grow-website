import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
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
import { scrollToSection, scrollToSectionAfterNavigate } from "@/utils/scroll";

const languages = [
  { key: "en", flag: "/images/flags/united-states.png" },
  { key: "ar", flag: "/images/flags/egyptian-flag.png" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const router = useRouter();
  const { currentLang, changeLanguage } = useLanguage();

  const handleLanguageChange = ({ key }) => {
    changeLanguage(key);
  };

  const currentLanguage =
    languages.find((lang) => lang.key === currentLang) || languages[0];

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
  const getChildLabel = useCallback(
    (linkName, childKey) => t(`${linkName}Children.${childKey}`),
    [t],
  );

  const menuItems = languages
    .filter((lang) => lang.key !== currentLang)
    .map((lang) => ({
      key: lang.key,
      label: (
        <span style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={lang?.flag}
            alt={`Switch to ${lang.key.toUpperCase()}`}
            width={32}
            height={32}
            className={styles.flag}
            sizes="32px"
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

  const handleDropdownItemClick = useCallback(
    (e, path, sectionId) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
      if (typeof window !== "undefined" && router.pathname === path) {
        scrollToSection(sectionId, path === "/services" ? 140 : 80);
      } else {
        router
          .push(`${path}#${sectionId}`, undefined, { scroll: false })
          .then(() => scrollToSectionAfterNavigate(sectionId));
      }
    },
    [router],
  );

  const mobileMenuItems = useMemo(() => {
    return navLinks.map((link) => {
      if (link.hasDropdown) {
        return {
          key: link.path,
          label: (
            <span className={styles.menuLabel}>{getNavLabel(link.name)}</span>
          ),
          children: link.children.map((child) => ({
            key: `${link.path}#${child.key}`,
            label: (
              <span
                role="link"
                tabIndex={0}
                className={styles.menuChildLink}
                aria-label={`Go to ${getChildLabel(link.name, child.key)}`}
                onClick={(e) =>
                  handleDropdownItemClick(e, link.path, child.key)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleDropdownItemClick(e, link.path, child.key);
                  }
                }}
              >
                {getChildLabel(link.name, child.key)}
              </span>
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
            aria-label={`Go to ${getNavLabel(link.name)}`}
          >
            {getNavLabel(link.name)}
          </Link>
        ),
      };
    });
  }, [currentLang, getNavLabel, getChildLabel, handleDropdownItemClick]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="Go to homepage">
            <Image
              src="/images/logo1.png"
              alt="Grow Logo"
              width={110}
              height={52}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              loading="eager"
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
                    aria-label={`Go to ${getNavLabel(link.name)}`}
                  >
                    <span className={styles.linkText}>
                      {getNavLabel(link.name)}
                    </span>
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
                          <span
                            role="link"
                            tabIndex={0}
                            className={styles.dropdownMenuItem}
                            aria-label={`Go to ${getChildLabel(
                              link.name,
                              child.key,
                            )}`}
                            onClick={(e) =>
                              handleDropdownItemClick(e, link.path, child.key)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleDropdownItemClick(
                                  e,
                                  link.path,
                                  child.key,
                                );
                              }
                            }}
                          >
                            {getChildLabel(link.name, child.key)}
                          </span>
                        ),
                      })),
                    }}
                    placement={
                      currentLang === "ar" ? "bottomRight" : "bottomLeft"
                    }
                    classNames={{ root: styles.dropdownOverlay }}
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
                  aria-label={`Go to ${getNavLabel(link.name)}`}
                >
                  <span className={styles.linkText}>
                    {getNavLabel(link.name)}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <Dropdown
              menu={{ items: menuItems, onClick: handleLanguageChange }}
              trigger={["click"]}
            >
              <CustomButton
                icon=""
                className={styles.languageButton}
                type="text"
                aria-label="Change language"
              >
                <span>
                  <Image
                    src={currentLanguage.flag}
                    alt={`Current language: ${currentLanguage.key}`}
                    width={32}
                    height={32}
                    className={styles.flag}
                  />
                </span>
              </CustomButton>
            </Dropdown>

            <Link
              href="/contact"
              passHref
              className={styles.contactUsButton}
              aria-label="Go to Contact page"
            >
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
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
            />
          </div>
        </div>
      </header>

      <Drawer
        placement="right"
        onClose={closeMobileMenu}
        open={mobileMenuOpen}
        styles={{
          body: { padding: 0 },
          header: { display: "none" },
          wrapper: { width: "85%", zIndex: 20001 },
        }}
        zIndex={20001}
        className={styles.mobileDrawer}
        aria-label="Mobile menu drawer"
      >
        <div className={styles.mobileMenuHeader}>
          <Link
            href="/"
            className={styles.mobileLogo}
            onClick={closeMobileMenu}
            aria-label="Go to homepage"
          >
            Grow
          </Link>

          <Button
            type="text"
            className={styles.mobileCloseBtn}
            onClick={closeMobileMenu}
            icon={<Uicons icon="fi-rr-cross" />}
            aria-label="Close mobile menu"
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

        <Link
          href="/contact"
          passHref
          className={styles.contactUsLinkMenu}
          aria-label="Go to Contact page"
        >
          <CustomButton className={styles.contactUsButtonMenu}>
            {t("contactUs")}
          </CustomButton>
        </Link>
      </Drawer>
    </>
  );
}
