import { useTranslation } from "next-i18next";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useEffect } from "react";

export function useAppTranslation() {
  const { t, i18n } = useTranslation("common");
  const { currentLang } = useLanguage();

  // Sync next-i18next with localStorage language
  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  return { t };
}