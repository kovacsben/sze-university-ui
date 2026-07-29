// Importáljuk a PrimeReact Button komponenst és átnevezzük PButton-nak,
// hogy megkülönböztessük a saját SZE Button komponenstől
import { Button as PButton } from "primereact/button";

/**
 * SZE Button - PrimeReact Button wrapper
 * 
 * Ez egy szoktatott Button komponens, amely a PrimeReact Button-ra épít,
 * de SZE-specifikus variantokkal és Tailwind stílusokkal bővíti azt.
 * 
 * @param {string} variant - Gomb típusa: "secondary", "outline", "text", "link"
 * @param {boolean} fullWidth - Ha true, a gomb 100% szélességű lesz
 * @param {string} className - További CSS osztályok a gombhoz
 * @param {*} props - Összes egyéb PrimeReact Button prop (label, icon, onClick, stb.)
 */
export default function Button({ variant, fullWidth, className, ...props }) {
  // Egy üres objektum, amely tartalmazza a PrimeReact-specifikus prop-okat
  const mapped = {};
  
  // Variant → PrimeReact prop mapping
  // Átkonvertáljuk az SZE variant-okat PrimeReact prop-okra
  if (variant === "secondary") mapped.severity = "secondary"; // Másodlagos szín (kék-zöld)
  if (variant === "outline")   mapped.outlined = true;        // Keretezett gomb (nincs kitöltés)
  if (variant === "text")      mapped.text = true;            // Csak szöveg, nincs háttér
  if (variant === "link")      mapped.link = true;            // Link-szerű megjelenés (aláhúzott)

  // Ha van ikon, de nincs label (vagy üres), akkor ikon-only gombként kezeljük
  const { label, icon, ...rest } = props;
  const isIconOnly = !!icon && (label === undefined || label === null || label === "");

  // Végső prop-ok: ha ikon-only, adunk label={null}, különben továbbadjuk a labelt
  const finalProps = { ...rest, icon, ...(isIconOnly ? { label: null } : { label }) };

  // className kombinálása
  const baseClass = (fullWidth ? "w-full " : "") + "flex items-center justify-center text-center " + (className || "");

  return <PButton {...mapped} {...finalProps} className={baseClass} />;
}
