import { IconField as PIconField } from "primereact/iconfield";

/** SZE IconField wrapper – csak ad egy alap osztályt a konténerre */
export default function IconField({ className, children, ...props }) {
  return (
    <PIconField
      {...props}
      className={("sze-iconfield " + (className || "")).trim()}
    >
      {children}
    </PIconField>
  );
}
