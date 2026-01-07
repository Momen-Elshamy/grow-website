import { Button } from "antd";
import Uicons from "./Uicons";

export default function CustomButton({
  children,
  icon = "fi-rr-arrow-right",
  ...props
}) {
  return (
    <Button
      type="primary"
      size="large"
      {...props}
    >
      {children}
      {icon && (
        <Uicons
          icon={icon}
          size="16px"
          style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}
        />
      )}
    </Button>
  );
}
