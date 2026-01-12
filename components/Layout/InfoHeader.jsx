import { Row, Col } from "antd";
import Uicons from "../UI/Uicons";
import styles from "./InfoHeader.module.css";

const socialIcons = [
  { icon: "fi-brands-facebook", desktopSize: 20, mobileSize: 18 },
  { icon: "fi-brands-instagram", desktopSize: 20, mobileSize: 18 },
  { icon: "fi-brands-youtube", desktopSize: 20, mobileSize: 18 },
  { icon: "fi-brands-linkedin", desktopSize: 20, mobileSize: 18 },
];

const infoItems = [
  {
    icon: "fi-rr-phone-call",
    text: "Call anytime",
    info: "01080200887",
    desktopSize: 30,
    mobileSize: 40,
  },
  {
    icon: "fi-rr-newsletter-subscribe",
    text: "Send email",
    info: "info@growegypt.com",
    desktopSize: 30,
    mobileSize: 40,
  },
  {
    icon: "fi-rr-land-layer-location",
    text: "380 St Kilda Road",
    info: "Smart village, linx building, office A105",
    desktopSize: 30,
    mobileSize: 40,
  },
];

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
                <p className={styles.text}>{item.text}</p>
                <p className={styles.info}>{item.info}</p>
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
                <p className={styles.text}>{item.text}</p>
                <p className={styles.info}>{item.info}</p>
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
