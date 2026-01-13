import { Row, Col } from "antd";
import Uicons from "../UI/Uicons";
import styles from "./InfoHeader.module.css";
import Link from "next/link";

const socialIcons = [
  { icon: "fi-brands-linkedin", desktopSize: 20, mobileSize: 18 },
  { icon: "fi-brands-facebook", desktopSize: 20, mobileSize: 18 },
  { icon: "fi-brands-instagram", desktopSize: 20, mobileSize: 18 },
  { icon: "fi-brands-youtube", desktopSize: 20, mobileSize: 18 },
];

const infoItems = [
  {
    icon: "fi-rr-phone-call",
    text: "+20235380720",
    // textLink: "tel:+20235380720",
    info: "+201080200887",
    // infoLink: "tel:+201080200887",
    desktopSize: 30,
    mobileSize: 40,
  },
  {
    icon: "fi-rr-newsletter-subscribe",
    text: "+201080200887",
    textLink: "https://wa.me/201080200887",
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
  const content = <p className={styles[fieldKey]}>{item[fieldKey]}</p>;
  const link = item[`${fieldKey}Link`];

  if (link) {
    return (
      <Link
        href={link}
        target={link.startsWith("http") ? "_blank" : undefined}
        rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
        className={styles.link}>{content}
      </Link>
    );
  }
  return <div>{content}</div>;
};

export default function InfoHeader() {
  return (
    <div className={styles.infoHeader}>
      <Row gutter={16} justify="center" className={styles.desktopRow}>
        {/* Social Icons Column */}
        <Col span={6} className={styles.iconsContainer}>
          <div className={styles.iconsWrapper}>
            {socialIcons.map((social, index) => (
              <div key={index} className={styles.iconBox}>
                <Uicons
                  icon={social.icon}
                  size={social.desktopSize}
                  color="black"
                  className={styles.socialIcon}
                />
              </div>
            ))}
          </div>
        </Col>

        {/* Info Items Columns */}
        {infoItems.map((item, index) => (
          <Col key={index} span={6} className={styles.iconsContainer}>
            <div className={styles.infoText}>
              <div className={styles.infoIconWrapper}>
                <Uicons
                  icon={item.icon}
                  size={item.desktopSize}
                  color="#107634"
                  className={styles.infoIcon}
                />
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
              <Uicons
                icon={item.icon}
                size={item.mobileSize}
                color="#107634"
                className={styles.infoIcon}
              />
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
              <Uicons
                icon={social.icon}
                size={social.mobileSize}
                color="black"
                className={styles.socialIcon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
