import { Row, Col } from "antd";
import Uicons from "../UI/Uicons";
import styles from "./InfoHeader.module.css";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";

function getSlot(block) {
  if (block?.phoneNumbers?.length > 0) return 0;
  const v = (block?.info?.[0]?.value ?? "").toLowerCase();
  const t = (block?.title ?? "").toLowerCase();
  if (/@|email|mail|ايميل|بريد|newsletter|subscribe/.test(v + " " + t)) return 1;
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
      icons: phones.length >= 2 ? ["fi-rr-phone-rotary", "fi-brands-whatsapp"] : undefined,
      text: n0,
      info: n1,
      textLink: n0 ? `tel:${n0.replace(/\D/g, "")}` : null,
      infoLink: toWaLink(n1) || toWaLink(n0),
      desktopSize: 18,
      mobileSize: 8,
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
    desktopSize: 30,
    mobileSize: 30,
  };
}

function buildInfoItems(contactData) {
  const data = Array.isArray(contactData) && contactData[0] ? contactData[0] : contactData;
  if (!data?.info?.length) return [];
  const blocks = data.info;
  const slots = [null, null, null];
  for (const b of blocks) {
    const i = getSlot(b);
    if (i >= 0 && slots[i] == null) slots[i] = b;
  }
  return slots
    .map((block, i) => (block ? toItem(block, i) : null))
    .filter(Boolean);
}

const INFO_FIELDS = ["text", "info"];

const InfoField = ({ item, fieldKey }) => {
  const val = item[fieldKey];
  if (!val) return null;
  const link = item[`${fieldKey}Link`];

  const content = <p className={styles[fieldKey]}>{val}</p>;

  if (link) {
    return (
      <Link
        href={link}
        target={link.startsWith("http") ? "_blank" : undefined}
        rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`${styles.link} ${styles[fieldKey]}`}
        aria-label={val} // Added for screen readers
      >
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
};

export default function InfoHeader({ socialMediaData, contactDataEn, contactDataAr }) {
  const { currentLang } = useLanguage();
  const contactData = currentLang === "ar" ? (contactDataAr ?? contactDataEn) : (contactDataEn ?? contactDataAr);
  const socialIcons = Array.isArray(socialMediaData) && socialMediaData.length > 0 ? socialMediaData : [];
  const infoItems = buildInfoItems(contactData);

  return (
    <div className={styles.infoHeader}>
      {/* Desktop Layout */}
      <Row gutter={16} justify="center" className={styles.desktopRow}>
        {socialIcons.length > 0 && (
          <Col span={6} className={styles.iconsContainer}>
            <div className={styles.iconsWrapper}>
              {socialIcons.map((s, i) => (
                <div key={i} className={styles.iconBox}>
                  <Link
                    href={s?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${s?.title || "social media link"}`} // Added
                  >
                    <Uicons icon={s?.icon} size={20} color="#17311E" className={styles.socialIcon} />
                  </Link>
                </div>
              ))}
            </div>
          </Col>
        )}

        {infoItems.map((item, i) => (
          <Col key={i} span={6} className={styles.iconsContainer}>
            <div className={styles.infoText}>
              <div className={styles.infoIconWrapper}>
                {item.icons ? (
                  item.icons.map((icon, j) => (
                    <Uicons key={j} icon={icon} size={item.desktopSize} color="#17311E" className={styles.infoIcon} />
                  ))
                ) : (
                  <Uicons icon={item.icon} size={item.desktopSize} color="#17311E" className={styles.infoIcon} />
                )}
              </div>
              <div className={styles.infoTextContent}>
                {INFO_FIELDS.map((key) => (
                  <InfoField key={key} item={item} fieldKey={key} />
                ))}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileInfoRow}>
          {infoItems.map((item, index) => (
            <div key={index} className={styles.mobileInfoItem}>
              {item.icons ? (
                <div className={styles.infoIconWrapper}>
                  {item.icons.map((icon, iconIndex) => (
                    <Uicons key={iconIndex} icon={icon} size={item.mobileSize} color="#17311E" className={styles.infoIcon} />
                  ))}
                </div>
              ) : (
                <Uicons icon={item.icon} size={item.mobileSize} color="#17311E" className={styles.infoIcon} />
              )}
              <div className={styles.infoTextContent}>
                {INFO_FIELDS.map((k) => (
                  <InfoField key={k} item={item} fieldKey={k} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {socialIcons.length > 0 && (
          <div className={styles.mobileIconsWrapper}>
            {socialIcons.map((s, i) => (
              <div key={i} className={styles.iconBox}>
                <Link
                  href={s?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${s?.title || "social media link"}`} // Added
                >
                  <Uicons icon={s?.icon} size={18} color="#17311E" className={styles.socialIcon} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
