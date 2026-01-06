import Link from "next/link";
import { Row, Col, Button } from "antd";
import styles from "./Footer.module.css";
import Uicons from "../UI/Uicons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[40, 40]} className={styles.top}>
          <Col xs={24} sm={24} md={24} lg={8} xl={7}>
            <div className={styles.logoSection}>
              <Link href="/" className={styles.logo}>
                Grow
              </Link>
              <p className={styles.description}>
                Our commitment is to help farmers have the technologies they need to protect the crops and empowering the future of food production!
              </p>
              <div className={styles.socials}>
                <Button 
                  type="primary" 
                  shape="default"
                  icon={<Uicons icon="fi-brands-facebook" />} 
                  aria-label="Facebook"
                  href="#"
                />
                <Button 
                  type="primary" 
                  shape="default"
                  icon={<Uicons icon="fi-brands-twitter-alt" />} 
                  aria-label="X"
                  href="#"
                />
                <Button 
                  type="primary" 
                  shape="default"
                  icon={<Uicons icon="fi-brands-linkedin" />} 
                  aria-label="LinkedIn"
                  href="#"
                />
              </div>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} xl={3}>
            <div className={styles.column}>
              <h4>About</h4>
              <ul className={styles.links}>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/farmers">Our Farmers</Link></li>
                <li><Link href="/products">Our Products</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={styles.column}>
              <h4>Services</h4>
              <ul className={styles.links}>
                <li><Link href="/services/seed">Seed Distribution</Link></li>
                <li><Link href="/services/soil">Soil Management</Link></li>
                <li><Link href="/services/irrigation">Irrigation Management</Link></li>
                <li><Link href="/services/reports">Detailed Field Reports</Link></li>
                <li><Link href="/services/planning">Crop Rotation Planning</Link></li>
                <li><Link href="/services/mapping">Soil Texture Mapping</Link></li>
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={styles.column}>
              <h4>Resources</h4>
              <ul className={styles.links}>
                <li><Link href="/news">News & Media</Link></li>
                <li><Link href="/how-it-works">How It Works</Link></li>
                <li><Link href="/pricing">Pricing Plans</Link></li>
                <li><Link href="/faqs">Help & FAQs</Link></li>
                <li><Link href="/awards">Awards</Link></li>
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} xl={6}>
            <div className={styles.column}>
              <h4>Quick Contact</h4>
              <div className={styles.contactInfo}>
                <p className={styles.contactItem}>
                  2307 Beverley Rd Brooklyn, <br />
                  New York, United States.
                </p>
                <p className={styles.contactItem}>
                  <Link href="mailto:contact@grow.com">contact@grow.com</Link>
                </p>
                <p className={`${styles.contactItem} ${styles.phone}`}>
                  +2 011 6114 5741
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.graphicContainer}>
        <img src="/images/footergraphic.svg" alt="" className={styles.footerGraphic} />
      </div>

      <div className={styles.bottom}>
        <div className={`${styles.container} ${styles.bottomContainer}`}>
          <p className={styles.copyright}>
            ©{currentYear} <span>Grow</span>, All Rights Reserved. With Love by premastlab.com
          </p>
          <ul className={styles.bottomLinks}>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
