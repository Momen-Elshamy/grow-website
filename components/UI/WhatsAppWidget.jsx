import React, { useMemo } from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import Uicons from "./Uicons";
import styles from "./WhatsAppWidget.module.css";
import Link from "next/link";

function getWhatsAppNumber(contactData) {
  const data = Array.isArray(contactData) && contactData[0] ? contactData[0] : contactData;
  const blocks = data?.info ?? [];
  for (const block of blocks) {
    const phones = block?.phoneNumbers ?? [];
    if (phones.length >= 2) {
      const p = phones[1];
      const num = (p?.number ?? "").toString().replace(/\D/g, "");
      if (num.length >= 10) return num.startsWith("2") ? num : "2" + num;
    }
    for (const p of phones) {
      const link = (p?.link ?? "").toString();
      if (link.includes("wa.me") || link.includes("whatsapp")) {
        const m = link.match(/wa\.me\/(\d+)/);
        if (m?.[1]) return m[1];
      }
    }
    if (phones.length === 1) {
      const num = (phones[0]?.number ?? "").toString().replace(/\D/g, "");
      if (num.length >= 10) return num.startsWith("2") ? num : "2" + num;
    }
  }
  return null;
}

export default function WhatsAppWidget({ contactDataEn, contactDataAr }) {
  const { currentLang } = useLanguage();
  const t = useMemo(() => {
    const dict = currentLang === "ar" ? ar : en;
    return (key) => {
      const keys = key.split(".");
      let val = dict;
      for (const k of keys) val = val?.[k];
      return val ?? key;
    };
  }, [currentLang]);
  const isRTL = currentLang === "ar";

  const contactData = currentLang === "ar" ? (contactDataAr ?? contactDataEn) : (contactDataEn ?? contactDataAr);
  const digits = getWhatsAppNumber(contactData);
  const message = t("whatsapp.message");
  const whatsappUrl = `https://wa.me/${digits || "201501515014"}?text=${encodeURIComponent(message)}`;

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
