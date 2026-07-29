// Importáljuk a PrimeReact Button komponenst, amely az ikon rendereléshez szükséges
import { Button as PButton } from "primereact/button";

/**
 * IconButton - Csak ikonokat tartalmazó gombkomponens
 * 
 * Ez egy speciális gomb, amely csak ikon megjelenítésére van optimalizálva
 * (nincs szöveg label). Ideális toolbar-okhoz, header gombokhoz, stb.
 * 
 * @param {*} props - PrimeReact Button prop-ok (icon, onClick, severity, stb.)
 *                   FONTOS: label automatikusan null-ra kerül!
 */
export default function IconButton(props) {
  // Renderelünk egy PrimeReact Button-t, de:
  // - label={null}: eltávolítjuk a szöveg részt, csak ikon marad
  // - className: kerek gombra állítunk:
  //   * !w-10 !h-10: 40px szélességet és magasságot állítunk (! = !important)
  //   * rounded-full: teljesen kerek forma (50% border-radius)
  //   * !p-0: eltávolítjuk az összes padding-ot
  //   * !inline-flex !items-center !justify-center: az ikon középre kerül
  // - props.className: felhasználó által hozzáadott osztályok (pl.: "mr-2")
  return <PButton {...props} label={null} className={"flex justify-center items-center " + (props.className || "")} />;
}
