import { Button as PButton } from "primereact/button";

/** SZE Button wrapper */
export default function Button({ variant, fullWidth, className, ...props }) {
  const mapped = {};
  if (variant === "secondary") mapped.severity = "secondary";
  if (variant === "outline")   mapped.outlined = true;
  if (variant === "text")      mapped.text = true;
  if (variant === "link")      mapped.link = true;

  return <PButton {...mapped} {...props} className={(fullWidth ? "w-full " : "") + (className || "")} />;
}
