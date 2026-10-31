/**
 * InputGroup - több kontroll (addon, input, dropdown, gomb) egyetlen,
 * összefüggő felületté fűzve.
 *
 * A gyerekek geometriáját (lekerekítés, magasság, keret-átfedés, z-index)
 * szándékosan NEM itt, cloneElement-tel hozzáfűzött Tailwind osztályokkal
 * állítjuk be: azok azonos specificitásúak a gyerekek saját PT-osztályaival
 * (pl. az InputText `rounded-3xl`-je vagy a Dropdown `h-11`-e), így a
 * generált CSS sorrendje döntötte el, melyik nyer - nem a szándék. Emiatt
 * csúsztak el az elemek. A szabályok a `.sze-inputgroup` osztályra szűkítve,
 * a @layer-eken kívül élnek: src/index.css "INPUT GROUP" szakasz.
 *
 * `flex` (nem `inline-flex`): a csoport blokkszintű form-vezérlő, így egymás
 * alá kerülnek a csoportok, és a `space-y-*` is hat rájuk a szülőben.
 * `min-h-10`: a közös sormagasság, amihez minden gyerek hozzáigazodik -
 * `className="h-14"`-gyel felülírható, mert a min-height nem ütközik vele.
 */
export default function InputGroup({ className, children, ...rest }) {
  return (
    <div
      {...rest}
      className={["sze-inputgroup flex items-stretch min-h-10", className || ""].join(" ").trim()}
    >
      {children}
    </div>
  );
}
