import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image";
import styles from "./Footer.module.css";
import Uicons from "../UI/Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useMemo } from "react";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";

// Determine slot: 0=phones, 1=email, 2=address
function getSlot(block) {
  if (block?.phoneNumbers?.length > 0) return 0;
  const v = (block?.info?.[0]?.value ?? "").toLowerCase();
  const t = (block?.title ?? "").toLowerCase();
  if (/@|email|mail|ايميل|بريد|newsletter|subscribe/.test(v + " " + t))
    return 1;
  if (/address|location|map|عنوان|موقع/.test(t)) return 2;
  return -1;
}

function toWaLink(num) {
  const digits = (num ?? "").toString().replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits.startsWith("2") ? digits : "2" + digits}`;
}

function toItem(block, slot) {
  const phones = block?.phoneNumbers ?? [];
  const infos = block?.info ?? [];

  if (slot === 0 && phones.length > 0) {
    const n0 = (phones[0]?.number ?? "").toString().trim();
    const n1 = phones[1] ? (phones[1]?.number ?? "").toString().trim() : "";
    return {
      icon: block?.icon,
      icons:
        phones.length >= 2
          ? ["fi-rr-phone-rotary", "fi-brands-whatsapp"]
          : undefined,
      text: n0,
      info: n1,
      textLink: n0 ? `tel:${n0.replace(/\D/g, "")}` : null,
      infoLink: toWaLink(n1) || toWaLink(n0),
      slot, // added slot
    };
  }

  const d = infos[0];
  const value = (d?.value ?? "").trim();
  const link = d?.link ?? null;
  const value2 = infos[1] ? (infos[1]?.value ?? "").trim() : "";

  return {
    icon: block?.icon,
    icons: undefined,
    text: value,
    info: value2,
    textLink: link,
    infoLink: infos[1]?.link ?? link,
    slot, // added slot
  };
}

function buildInfoItems(contactData) {
  const data =
    Array.isArray(contactData) && contactData[0] ? contactData[0] : contactData;

  if (!data?.info?.length) return [];

  const slots = [null, null, null];

  for (const block of data.info) {
    const i = getSlot(block);
    if (i >= 0 && slots[i] == null) slots[i] = block;
  }

  return slots
    .map((block, i) => (block ? toItem(block, i) : null))
    .filter(Boolean);
}

// Updated InfoField
const InfoField = ({ item, isInfo }) => {
  const text = isInfo ? item.info : item.text;
  const link = isInfo ? item.infoLink : item.textLink;

  if (!text) return null;

  return (
    <Link
      href={link}
      className={styles.link}
      target={link?.startsWith("http") ? "_blank" : undefined}
      rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <p className={styles.text}>{text}</p>
    </Link>
  );
};

export default function Footer({
  socialMediaData,
  contactDataEn,
  contactDataAr,
}) {
  const { currentLang } = useLanguage();
  const currentYear = new Date().getFullYear();

  const contactData =
    currentLang === "ar"
      ? (contactDataAr ?? contactDataEn)
      : (contactDataEn ?? contactDataAr);

  const infoItems = useMemo(() => buildInfoItems(contactData), [contactData]);

  const t = useMemo(() => {
    const dict = currentLang === "ar" ? ar : en;
    return (key) => key.split(".").reduce((o, k) => o?.[k], dict) ?? key;
  }, [currentLang]);

  // Fix last phone number: check both text and info of slot 0
  const phoneItems = infoItems.filter((item) => item.slot === 0);
  let lastNumber = null;
  if (phoneItems.length > 0) {
    const lastItem = phoneItems[phoneItems.length - 1];
    lastNumber = lastItem.info || lastItem.text;
  }

  const socialLinks =
    socialMediaData &&
    Array.isArray(socialMediaData) &&
    socialMediaData.length > 0
      ? socialMediaData
      : [
          { icon: "fi-brands-linkedin", link: "#" },
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
    {
      label: t("footer.solutionsLinks.operation"),
      href: "/solutions#operation",
    },
    { label: t("footer.solutionsLinks.frp"), href: "/solutions#frp" },
    { label: t("footer.solutionsLinks.water"), href: "/solutions#water" },
    { label: t("footer.solutionsLinks.training"), href: "/solutions#training" },
    {
      label: t("footer.solutionsLinks.commercial"),
      href: "/solutions#commercial",
    },
  ];

  const servicesLinks = [
    {
      label: t("footer.servicesLinks.consultancy"),
      href: "/services#consultancy",
    },
    { label: t("footer.servicesLinks.lab"), href: "/services#lab" },
    { label: t("footer.servicesLinks.course"), href: "/services#training" },
    {
      label: t("footer.servicesLinks.irrigation"),
      href: "/services#irrigation",
    },
    {
      label: t("footer.servicesLinks.optimization"),
      href: "/services#optimization",
    },
    {
      label: t("footer.servicesLinks.remoteSensing"),
      href: "/services#remote-sensing",
    },
  ];

  const bottomLinks = [
    { label: t("footer.bottomLinks.terms"), href: "/terms-and-conditions" },
    {
      label: t("footer.bottomLinks.sitemap"),
      href: "https://maps.google.com/?q=A105+LINX+building,+Smart+Village,+12577+Giza,+Egypt",
      external: true,
    },
  ];

  const addressItem = infoItems.find((item) => item.slot === 2);
  const emailItem = infoItems.find((item) => item.slot === 1);
  const lastPhoneItem =
    phoneItems.length > 0 ? phoneItems[phoneItems.length - 1] : null;

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
              <p className={styles.description}>{t("footer.description")}</p>
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
                  {col.links.map((link, i) => (
                    <li key={i}>
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
                {/* {firstAddress && <InfoField item={firstAddress} />}
                {email && <InfoField item={email} />} */}
                {/* {lastNumber && <InfoField item={lastNumber} />} */}
                {addressItem && <InfoField item={addressItem} isInfo={false} />}
                {emailItem && <InfoField item={emailItem} isInfo={false} />}
                {lastPhoneItem && (
                  <InfoField item={lastPhoneItem} isInfo={true} />
                )}
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
