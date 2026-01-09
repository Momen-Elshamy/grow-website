import { Button } from "antd";
import Uicons from "./Uicons";

export default function CustomButton({
  children,
  icon = "fi-rr-arrow-right",
  iconColor = "white",
  style,
  ...props
}) {
  return (
    <Button
      type="primary"
      size="large"
      style={{ padding: "24px", ...style }}
      {...props}
    >
      {children}
      {icon && (
        <Uicons
          icon={icon}
          size="16px"
          style={{
            color: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </Button>
  );
}
