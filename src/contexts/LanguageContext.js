import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Always start with "en" so server and first client render match (avoids hydration error).
  // useEffect below applies saved language from localStorage after mount.
  const [currentLang, setCurrentLang] = useState("en");

  // Load saved language from localStorage after mount so server and first paint match
  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);

    // Set initial direction immediately
    if (typeof document !== "undefined") {
      const dir = savedLang === "ar" ? "rtl" : "ltr";
      const lang = savedLang === "ar" ? "ar" : "en";
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", lang);
    }

    // Sync with next-i18next if available
    if (typeof window !== "undefined" && window.i18n) {
      window.i18n.changeLanguage(savedLang);
    }
  }, []);

  // Save language to localStorage when it changes
  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem("language", lang);

    // Update direction immediately
    if (typeof document !== "undefined") {
      const dir = lang === "ar" ? "rtl" : "ltr";
      const langAttr = lang === "ar" ? "ar" : "en";
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", langAttr);
    }

    // Sync with next-i18next if available
    if (typeof window !== "undefined" && window.i18n) {
      window.i18n.changeLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
