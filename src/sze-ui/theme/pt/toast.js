import { classNames } from "primereact/utils";
import { RADIUS, SHADOW } from "../tokens";
import { BUTTON_BASE, buttonVariantClasses } from "./button";

/**
 * Toast Pass-Through (PT) stílusok
 *
 * Szerkezet: root > (TransitionGroup div) > message > content >
 * icon, text (summary, detail), div > closeButton > buttonicon.
 *
 * A `position: fixed` és a sarokhoz igazítás a PrimeReact inline stílusa, ez
 * unstyled módban is megmarad. A szélesség, a középre igazítás eltolása és a
 * belső elrendezés viszont a PrimeReact CSS-ében van, ezért itt kell megadni.
 */

// Középre igazításnál a PrimeReact `left: 50%`-ot ad, az eltolás a CSS-éből hiányzik.
const POSITION = {
  "top-center": "-translate-x-1/2",
  "bottom-center": "-translate-x-1/2",
  center: "-translate-x-1/2 -translate-y-1/2",
};

// A PrimeReact a `warn` nevet használja, csak ehhez a négyhez ad alapikont.
const SEVERITY = {
  info: { accent: "border-l-sze-secondary", icon: "text-sze-secondary" },
  success: { accent: "border-l-success", icon: "text-success" },
  warn: { accent: "border-l-warning", icon: "text-warning" },
  error: { accent: "border-l-danger", icon: "text-danger" },
};

// Az üzenetrészek PT-függvénye nem kapja meg a súlyosságot, csak az indexet és
// a Toast állapotát, ezért onnan kell kikeresni.
const severityOf = ({ state, index }) =>
  SEVERITY[state?.messages?.[index]?.message?.severity] ?? SEVERITY.info;

export const toast = {
  // A `className` és a `style` prop unstyled módban nem jut el a gyökérig.
  root: ({ props }) => ({
    className: classNames("w-[calc(100%-2.5rem)] max-w-sm", POSITION[props.position], props.className),
    style: props.style,
  }),

  // A kezdő és az "active" osztály egyszerre van az elemen, ezért kell a !important.
  // Eltűnéskor a magasság is összecsukódik, hogy a többi üzenet simán a helyére csússzon.
  transition: {
    classNames: {
      enter: "opacity-0 translate-y-1/2",
      enterActive: "!opacity-100 !translate-y-0 transition duration-300 ease-out",
      exit: "max-h-[1000px]",
      exitActive:
        "!max-h-0 !mb-0 overflow-hidden opacity-0 [transition:max-height_300ms_cubic-bezier(0,1,0,1),opacity_300ms,margin-bottom_300ms]",
    },
  },

  // A térköz margó, mert az üzenetek közös szülője a TransitionGroup div-je, nem a root.
  message: (options) => ({
    className: classNames(
      "mb-3 last:mb-0 border border-l-4 border-gray-200 bg-white",
      RADIUS.lg,
      SHADOW.lg,
      severityOf(options).accent
    ),
  }),

  content: { className: "flex items-start gap-3 p-4" },

  icon: (options) => ({
    className: classNames("mt-0.5 h-5 w-5 shrink-0", severityOf(options).icon),
  }),

  text: { className: "min-w-0 flex-1" },
  summary: { className: "block font-semibold text-sze-primary [overflow-wrap:anywhere]" },
  detail: { className: "mt-1 text-sm text-gray-600 [overflow-wrap:anywhere]" },

  // A bezáró gomb a Button `text` variánsát kapja, mint a Dialogé.
  closeButton: {
    "aria-label": "Bezárás",
    className: classNames(
      ...BUTTON_BASE,
      RADIUS.full,
      "-my-1 -mr-1 h-8 w-8 shrink-0",
      buttonVariantClasses({ text: true })
    ),
  },
  buttonicon: { className: "h-3.5 w-3.5" },
};
