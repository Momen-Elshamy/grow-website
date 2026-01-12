import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image";
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
                Our commitment is to help farmers have the technologies they
                need to protect the crops and empowering the future of food
                production!
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
                  icon={<Uicons icon="fi-brands-instagram" />}
                  aria-label="Instagram"
                  href="#"
                />
                <Button
                  type="primary"
                  shape="default"
                  icon={<Uicons icon="fi-brands-youtube" />}
                  aria-label="YouTube"
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
                <li>
                  <Link href="/about#values">Our Values</Link>
                </li>
                <li>
                  <Link href="/about#mission">Vision & Mission</Link>
                </li>
                <li>
                  <Link href="/about#experts">Meet Our Experts</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={styles.column}>
              <h4>Solutions</h4>
              <ul className={styles.links}>
                <li>
                  <Link href="/solutions#operation">Farm Operation</Link>
                </li>
                <li>
                  <Link href="/solutions#frp">
                    Farm Resource Planning solution "FRP"
                  </Link>
                </li>
                <li>
                  <Link href="/solutions#water">Water Management</Link>
                </li>
                <li>
                  <Link href="/solutions#training">Human Capital Training</Link>
                </li>
                <li>
                  <Link href="/solutions#commercial">
                    Commercial Management
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className={styles.column}>
              <h4>Services</h4>
              <ul className={styles.links}>
                <li>
                  <Link href="/services#consultancy">
                    Technical Consultancy
                  </Link>
                </li>
                <li>
                  <Link href="/services#lab">Lab analysis</Link>
                </li>
                <li>
                  <Link href="/services#training">Course</Link>
                </li>
                <li>
                  <Link href="/services#irrigation">Engineering</Link>
                </li>
                <li>
                  <Link href="/services#optimization">
                    Revision and optimization
                  </Link>
                </li>
                <li>
                  <Link href="/services#remote-sensing">Remote sensing</Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} xl={6}>
            <div className={styles.column}>
              <h4>Quick Contact</h4>
              <div className={styles.contactInfo}>
                <p className={styles.contactItem}>
                  Smart village, linx building, office A105
                </p>
                <p className={styles.contactItem}>
                  <Link href="mailto:info@growegypt.com">
                    info@growegypt.com
                  </Link>
                </p>
                <p className={`${styles.contactItem} ${styles.phone}`}>
                  01080200887
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
            ©{currentYear} <span>Grow</span>, All Rights Reserved. With Love by
            premastlab.com
          </p>
          <ul className={styles.bottomLinks}>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
