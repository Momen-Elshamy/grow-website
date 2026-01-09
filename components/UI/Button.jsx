import { Button } from "antd";
import Uicons from "./Uicons";

export default function CustomButton({
  children,
  icon = "fi-rr-arrow-right",
  iconColor = "white",
  ...props
}) {
  return (
    <Button type="primary" size="large" {...props}>
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
