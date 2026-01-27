import { Button } from "antd";
import Uicons from "./Uicons";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function CustomButton({
  children,
  icon,
  iconColor = "white",
  style,
  ...props
}) {
  const { currentLang } = useLanguage();
  const isRTL = currentLang === "ar";
  const defaultIcon = isRTL ? "fi-rr-arrow-small-left" : "fi-rr-arrow-small-right";
  const iconToUse = icon !== undefined ? icon : defaultIcon;

  return (
    <Button
      type="primary"
      size="large"
      style={{
        padding: "24px",
        fontWeight: 500,
        ...style,
      }}
      {...props}
    >
      {/* dir="ltr" keeps our layout correct when inside RTL parents (e.g. hero contentColRTL) */}
      <span
        dir="ltr"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        {children}
        {iconToUse && (
          <Uicons
            icon={iconToUse}
            size="16px"
            style={{
              color: iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
      </span>
    </Button>
  );
}
