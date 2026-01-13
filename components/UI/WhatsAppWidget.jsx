import React from "react";
import { Button } from "antd";
import Uicons from "./Uicons";
import styles from "./WhatsAppWidget.module.css";
import Link from "next/link";

const WhatsAppWidget = () => {
  const phoneNumber = "201080200887"; // Based on earlier info 01080200887
  const message = "Hello, I'm interested in your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className={styles.widgetWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoCircle}>
            {/* Using a placeholder Grow 'G' or similar if logo not easily available as icon */}
            <span className={styles.logoText}>G</span>
          </div>
          <p className={styles.headerText}>
            Leave us a message and we'll get back to you.
          </p>
        </div>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <Uicons icon="fi-brands-whatsapp" size="22px" color="#25D366"  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
          <span className={styles.buttonText}>Contact us on WhatsApp</span>
        </Link>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
