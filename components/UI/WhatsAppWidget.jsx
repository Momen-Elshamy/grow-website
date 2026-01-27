import React, { useMemo } from "react";
import { Button } from "antd";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import Uicons from "./Uicons";
import styles from "./WhatsAppWidget.module.css";
import Link from "next/link";

export default function WhatsAppWidget() {
  const { currentLang } = useLanguage();
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
  const isRTL = currentLang === "ar";
  
  const phoneNumber = "+201080200887"; // Based on earlier info 01080200887
  const message = t("whatsapp.message");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className={`${styles.widgetWrapper} ${isRTL ? styles.widgetWrapperRTL : ""}`}>
      <div className={`${styles.container} ${isRTL ? styles.containerRTL : ""}`}>
        <div className={styles.header}>
          <div className={styles.logoCircle}>
            {/* Using a placeholder Grow 'G' or similar if logo not easily available as icon */}
            <span className={styles.logoText}>G</span>
          </div>
          <p className={styles.headerText}>
            {t("whatsapp.headerText")}
          </p>
        </div>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          {isRTL && (
            <Uicons
              icon="fi-brands-whatsapp"
              size="22px"
              color="#25D366"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
          <span className={styles.buttonText}>{t("whatsapp.buttonText")}</span>
          {!isRTL && (
            <Uicons
              icon="fi-brands-whatsapp"
              size="22px"
              color="#25D366"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </Link>
      </div>
    </div>
  );
}
