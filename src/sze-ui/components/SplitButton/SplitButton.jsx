import { SplitButton as PSplitButton } from "primereact/splitbutton";

/**
 * SZE SplitButton wrapper
 * variant: 'primary' | 'secondary' | 'outline' | 'text'
 * size: 'small' | 'normal' | 'large'
 * model: PrimeReact menüelemek [{ label, icon, command }, ...]
 */
export default function SplitButton({ variant, className, ...props }) {
  // Button-hoz hasonló „cukormáz”
  const mapped = {};
  if (variant === "secondary") mapped.severity = "secondary";
  if (variant === "outline") mapped.outlined = true;
  if (variant === "text") mapped.text = true;

  return <PSplitButton {...mapped} {...props} className={className} />;
}
