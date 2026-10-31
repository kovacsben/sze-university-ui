import { classNames } from "primereact/utils";
import { RADIUS, DURATION } from "../tokens";

/**
 * Knob Pass-Through (PT) stílusok
 *
 * A színezés kulcsa a `fill-none`: a PrimeReact a saját `.p-knob-range` /
 * `.p-knob-value` szabályaiban adná meg a `fill: none`-t, de azt a CSS-t
 * unstyled módban nem injektálja be. Enélkül a két ív SVG-alapértelmezés
 * szerint FEKETÉN kitöltődik - innen jött a fekete korong a gomb helyén.
 *
 * A `stroke` / `fill` színeket szándékosan NEM állítjuk itt: azokat a
 * PrimeReact attribútumként teszi ki a `valueColor` / `rangeColor` /
 * `textColor` propokból (az SZE-s alapértékeket lásd a Knob komponensben),
 * és egy CSS-szabály itt elnyomná a prop-pal való felülírhatóságot.
 */
export const knobPT = {
  // A gyökér blokkszintű és középre igazít - a gomb a rendelkezésre álló
  // sáv közepén ül. A húzást az SVG kezeli, nem a gyökér, így a gombtól
  // távol eső kattintások nem állítják át az értéket.
  root: { className: "flex items-center justify-center p-4 text-sze-primary" },

  svg: {
    className: classNames(
      "cursor-pointer select-none",
      // touch-none: húzás közben a mobil ne görgesse az oldalt helyette.
      "touch-none",
      `${RADIUS.full} outline-none`,
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sze-secondary"
    ),
  },

  // A háttérív (a teljes skála).
  range: { className: "fill-none [stroke-linecap:round]" },

  // A kitöltött ív (az aktuális érték). A stroke-átmenet lekerekített
  // véggel együtt teszi folyamatossá a húzást.
  value: {
    className: classNames("fill-none [stroke-linecap:round]", `transition-[stroke] ${DURATION.fast}`),
  },

  // Csak tipográfia - a szín a textColor propból jön.
  label: { className: "text-xl font-semibold [text-anchor:middle]" },
};
