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

  // Visszatérési érték: a PrimeReact Button renderelésével
  // - {...mapped} - a variant prop-okat alkalmazzuk
  // - {...props} - az összes egyéb prop (label, onClick, icon, stb.) továbbadódik
  // - className - kombinálunk:
  //   * fullWidth ? "w-full " : "" → teljes szélességű (ha kell)
  //   * + (className || "") → felhasználó által megadott CSS osztályok
  return <PButton {...mapped} {...props} className={(fullWidth ? "w-full " : "") + (className || "")} />;
}
