import { InputIcon as PInputIcon } from "primereact/inputicon";

export default function InputIcon({ position = "left", icon, className, ...rest }) {
  const sideCls = position === "right" ? "sze-inputicon-right right-3" : "sze-inputicon-left left-3";

  return (
    <PInputIcon
      {...rest}
      className={[
        "sze-inputicon absolute top-1/2 -translate-y-1/2 pointer-events-none",
        // fix „hitbox”: kb. 20×20px, így könnyebb jól belőni a paddinget
        "h-5 w-5 flex items-center justify-center",
        "text-black/60",
        sideCls,
        icon || "",
        className || ""
      ].join(" ").trim()}
    />
  );
}
