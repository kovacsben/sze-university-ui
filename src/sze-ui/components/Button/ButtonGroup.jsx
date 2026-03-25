/**
 * ButtonGroup - Gombcsoportok tárolója
 * 
 * Egy egyszerű layout komponens, amely több Button-t egymás mellett helyez el
 * (flexbox-szel, kis térközzel).
 * 
 * @param {ReactNode} children - A gombkomponensek (Button, IconButton, stb.)
 * @param {string} className - További CSS osztályok (opcionális)
 */
export default function ButtonGroup({ children, className }) {
  // Renderelünk egy div-et flexbox layout-tal:
  // - inline-flex: a komponens csak az éppen szükséges helyet forglalja el
  // - gap-2: 8px (Tailwind gap-2) távolság a gombók között
  // - className: felhasználó által megadott osztályok (pl.: "mt-4", "justify-center")
  return <div className={"inline-flex gap-2 " + (className || "")}>{children}</div>;
}
