import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image";
import styles from "./Footer.module.css";
import Uicons from "../UI/Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useMemo } from "react";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

export default function Footer({ socialMediaData }) {
  const { currentLang } = useLanguage();
  const currentYear = new Date().getFullYear();

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

  const socialLinks = socialMediaData && Array.isArray(socialMediaData) && socialMediaData.length > 0
    ? socialMediaData
    : [
      { icon: "fi-brands-linkedin", link: "https://www.linkedin.com/posts/grow-management-egypt_grow-management-growmanagement-activity-7331199004807946240-rool?utm_source=share&utm_medium=member_ios&rcm=ACoAAFS3wzMBHKeBGCZwlmhQTglgFYpfJj7BShU" },
      { icon: "fi-brands-facebook", link: "#" },
      { icon: "fi-brands-instagram", link: "#" },
      { icon: "fi-brands-youtube", link: "#" },
    ];

  const aboutLinks = [
    { label: t("footer.aboutLinks.values"), href: "/about#values" },
    { label: t("footer.aboutLinks.mission"), href: "/about#mission" },
    { label: t("footer.aboutLinks.experts"), href: "/about#experts" },
    { label: t("footer.aboutLinks.contactUs"), href: "/contact" },
  ];

  const solutionsLinks = [
    { label: t("footer.solutionsLinks.operation"), href: "/solutions#operation" },
    { label: t("footer.solutionsLinks.frp"), href: "/solutions#frp" },
    { label: t("footer.solutionsLinks.water"), href: "/solutions#water" },
    { label: t("footer.solutionsLinks.training"), href: "/solutions#training" },
    { label: t("footer.solutionsLinks.commercial"), href: "/solutions#commercial" },
  ];

  const servicesLinks = [
    { label: t("footer.servicesLinks.consultancy"), href: "/services#consultancy" },
    { label: t("footer.servicesLinks.lab"), href: "/services#lab" },
    { label: t("footer.servicesLinks.course"), href: "/services#training" },
    { label: t("footer.servicesLinks.irrigation"), href: "/services#irrigation" },
    { label: t("footer.servicesLinks.optimization"), href: "/services#optimization" },
    { label: t("footer.servicesLinks.remoteSensing"), href: "/services#remote-sensing" },
  ];

  const bottomLinks = [
    { label: t("footer.bottomLinks.terms"), href: "/terms-and-conditions" },
    // { label: t("footer.bottomLinks.privacy"), href: "/privacy" },
    {
      label: t("footer.bottomLinks.sitemap"),
      href: "https://maps.google.com/?q=A105+LINX+building,+Smart+Village,+12577+Giza,+Egypt",
      external: true,
    },
  ];


  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[60, 40]} className={styles.top}>
          <Col xs={24} sm={24} md={24} lg={8} xl={7}>
            <div className={styles.logoSection}>
              <Link href="/" className={styles.logo}>
                <Image
                  src="/images/logo2.png"
                  alt="Grow Logo"
                  width={90}
                  height={40}
                  className={styles.logoImage}
                />
              </Link>
              <p className={styles.description}>
                {t("footer.description")}
              </p>
              <div className={styles.socials}>
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="primary"
                      shape="default"
                      icon={<Uicons icon={social.icon} />}
                      aria-label={t(`footer.social.${social.icon.split('-').pop()}`)}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Col>

          {[
            { title: t("footer.about"), links: aboutLinks, xl: 3 },
            { title: t("footer.solutions"), links: solutionsLinks, xl: 4 },
            { title: t("footer.services"), links: servicesLinks, xl: 4 },
          ].map((col, idx) => (
            <Col key={idx} xs={12} sm={12} md={6} lg={4} xl={col.xl}>
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>{col.title}</h3>
                <ul className={styles.links}>
                  {col.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}

          <Col xs={12} sm={12} md={6} lg={4} xl={6}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{t("footer.quickContact")}</h3>
              <div className={styles.contactInfo}>
                <p className={styles.contactItem}>
                  <Link
                    href="https://maps.google.com/?q=A105+LINX+building,+Smart+Village,+12577+Giza,+Egypt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A105 LINX building, Smart Village
                  </Link>
                </p>
                <p className={styles.contactItem}>
                  <Link href="mailto:info@grow-egypt.com">
                    info@grow-egypt.com
                  </Link>
                </p>
                <p className={`${styles.contactItem} ${styles.phone}`}>
                  +201080200887
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.graphicContainer}>
        <Image
          src="/images/footergraphic.svg"
          alt=""
          className={styles.footerGraphic}
          width={1920}
          height={400}
        />
      </div>

      <div className={styles.bottom}>
        <div className={`${styles.container} ${styles.bottomContainer}`}>
          <p className={styles.copyright}>
            ©{currentYear} <span>Grow</span>, {t("footer.copyright")}{" "}
            premastlab.com
          </p>
          <ul className={styles.bottomLinks}>
            {bottomLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
