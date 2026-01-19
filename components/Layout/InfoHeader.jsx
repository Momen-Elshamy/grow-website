import { Row, Col } from "antd";
import Uicons from "../UI/Uicons";
import styles from "./InfoHeader.module.css";
import Link from "next/link";

const infoItems = [
  {
    icons: ["fi-rr-phone-rotary", "fi-brands-whatsapp"],
    text: "+20235380720",
    info: "+201080200887",
    infoLink: "https://wa.me/201080200887",
    desktopSize: 16,
    mobileSize: 16,
  },
  {
    icon: "fi-rr-newsletter-subscribe",
    // text: "+201080200887",
    // textLink: "https://wa.me/201080200887",
    info: "info@grow-egypt.com",
    infoLink: "mailto:info@grow-egypt.com",
    desktopSize: 30,
    mobileSize: 40,
  },
  {
    icon: "fi-rr-land-layer-location",
    text: "A105 LINX building, Smart Village",
    textLink:
      "https://maps.google.com/?q=A105+LINX+building,+Smart+Village,+12577+Giza,+Egypt",
    info: "12577 Giza, Egypt",
    infoLink:
      "https://maps.google.com/?q=A105+LINX+building,+Smart+Village,+12577+Giza,+Egypt",
    desktopSize: 30,
    mobileSize: 40,
  },
];

const INFO_FIELDS = ["text", "info"];

const InfoField = ({ item, fieldKey }) => {
  const fieldValue = item[fieldKey];
  if (!fieldValue) return null;

  const content = <p className={styles[fieldKey]}>{fieldValue}</p>;
  const link = item[`${fieldKey}Link`];

  if (link) {
    return (
      <Link
        href={link}
        target={link.startsWith("http") ? "_blank" : undefined}
        rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
        className={styles.link}
      >
        {content}
      </Link>
    );
  }
  return <div>{content}</div>;
};

export default function InfoHeader({ socialMediaData }) {
  const socialIcons =
    socialMediaData &&
    Array.isArray(socialMediaData) &&
    socialMediaData.length > 0
      ? socialMediaData
      : [
          {
            icon: "fi-brands-linkedin",
            link: "https://www.linkedin.com/posts/grow-management-egypt_grow-management-growmanagement-activity-7331199004807946240-rool?utm_source=share&utm_medium=member_ios&rcm=ACoAAFS3wzMBHKeBGCZwlmhQTglgFYpfJj7BShU",
          },
          { icon: "fi-brands-facebook", link: "#" },
          { icon: "fi-brands-instagram", link: "#" },
          { icon: "fi-brands-youtube", link: "#" },
        ];
  return (
    <div className={styles.infoHeader}>
      <Row gutter={16} justify="center" className={styles.desktopRow}>
        {/* Social Icons Column */}
        <Col span={6} className={styles.iconsContainer}>
          <div className={styles.iconsWrapper}>
            {socialIcons.map((social, index) => (
              <div key={index} className={styles.iconBox}>
                <Link
                  href={social?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Uicons
                    icon={social?.icon}
                    size={20}
                    color="black"
                    className={styles.socialIcon}
                  />
                </Link>
              </div>
            ))}
          </div>
        </Col>

        {/* Info Items Columns */}
        {infoItems.map((item, index) => (
          <Col key={index} span={6} className={styles.iconsContainer}>
            <div className={styles.infoText}>
              <div className={styles.infoIconWrapper}>
                {item.icons ? (
                  item.icons.map((icon, iconIndex) => (
                    <Uicons
                      key={iconIndex}
                      icon={icon}
                      size={item.desktopSize}
                      color="#107634"
                      className={styles.infoIcon}
                    />
                  ))
                ) : (
                  <Uicons
                    icon={item.icon}
                    size={item.desktopSize}
                    color="#107634"
                    className={styles.infoIcon}
                  />
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
                item.icons.map((icon, iconIndex) => (
                  <Uicons
                    key={iconIndex}
                    icon={icon}
                    size={item.mobileSize}
                    color="#107634"
                    className={styles.infoIcon}
                  />
                ))
              ) : (
                <Uicons
                  icon={item.icon}
                  size={item.mobileSize}
                  color="#107634"
                  className={styles.infoIcon}
                />
              )}
              <div className={styles.infoTextContent}>
                {INFO_FIELDS.map((key) => (
                  <InfoField key={key} item={item} fieldKey={key} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mobileIconsWrapper}>
          {socialIcons.map((social, index) => (
            <div key={index} className={styles.iconBox}>
              <Link
                href={social?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Uicons
                  icon={social?.icon}
                  size={18}
                  color="black"
                  className={styles.socialIcon}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
