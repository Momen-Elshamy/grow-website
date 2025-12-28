export default function Uicons({ icon, className = "", onClick, style, size, color, ...props }) {
    const classes = ["fi", icon, className].filter(Boolean).join(" ");
   
    return (
      <i
        className={classes}
        onClick={onClick}
        style={{ fontSize: size, color, display: "inline-block", ...style }}
        {...props}
      />
    );
  }