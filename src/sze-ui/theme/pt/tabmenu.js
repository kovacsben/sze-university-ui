import { classNames } from "primereact/utils";
import { DURATION } from "../tokens";

/**
 * TabMenu Pass-Through (PT) stílusok
 *
 * Korábban egyik szekció sem jelezte az AKTÍV fület: csak `hover:border-*`
 * volt rajtuk, így kattintás után - amint az egér elhagyta a menüt - mind a
 * három fül egyformán nézett ki. Az állapot váltott, a felhasználó viszont
 * nem látta, melyik fülön áll.
 *
 * Az aktív indexet a `state.activeIndex` adja: a PrimeReact ide a
 * kontrollált (`props.activeIndex`) és a kontrollálatlan (belső állapot)
 * esetben is a tényleges értéket teszi.
 */
const isActive = (state, context) => state?.activeIndex === context?.index;

export const tabmenu = {
  // A gyökér vékony, halvány vonalat kap: ha ez is sze-primary 2px lenne
  // (mint korábban), az aktív fül saját aláhúzása beleolvadna, és csak a
  // félkövér szöveg jelezné, hol állunk.
  root: {
    className: "bg-white border-b border-gray-200 overflow-x-auto",
  },
  menu: {
    className: "flex list-none m-0 p-0 gap-0",
  },
  menuitem: ({ state, context }) => ({
    className: classNames(
      `border-b-2 -mb-px transition-colors ${DURATION.normal}`,
      isActive(state, context)
        ? "border-sze-primary"
        : "border-transparent hover:border-sze-primary/40"
    ),
  }),
  action: ({ state, context }) => ({
    className: classNames(
      "flex items-center gap-2 px-4 py-3 cursor-pointer",
      `transition-colors ${DURATION.normal}`,
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary focus-visible:ring-inset",
      isActive(state, context)
        ? "font-semibold text-sze-primary"
        : "font-medium text-gray-700 hover:text-sze-primary"
    ),
  }),
  icon: { className: "text-base" },
  // A PrimeReact csúszó aláhúzása a saját CSS-ére épülne; itt a menuitem
  // alsó kerete jelzi az aktív fület, ezért ezt elrejtjük.
  inkbar: { className: "hidden" },
};
