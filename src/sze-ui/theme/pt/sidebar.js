import { classNames } from "primereact/utils";
import { RADIUS, SHADOW } from "../tokens";
import { BUTTON_BASE } from "./button";

/**
 * Sidebar Pass-Through (PT) stílusok
 *
 * Szerkezet: mask > root > header (a header prop + icons > closeButton), content
 *
 * Beúszás: a PrimeReact egy react-transition-group CSSTransition-t használ,
 * amelynek a `classNames`-e a PT `transition` kulcsából felülírható. Unstyled
 * módban enélkül a panel egyszerűen felvillant. A kezdő osztály a képernyőn
 * kívülre tolja a panelt, az "active" osztály (egy képkockával később)
 * visszahúzza - a kettő között a transition-transform animál. A két osztály
 * egyszerre van az elemen, ezért az active-ban !important kell.
 * A Tailwind osztályok teljes, literál nevek (lásd tokens.js megjegyzése).
 */
const TRANSITIONS = {
  left: {
    enter: "-translate-x-full",
    enterActive: "!translate-x-0 transition-transform duration-300 ease-out",
    exitActive: "-translate-x-full transition-transform duration-200 ease-in",
  },
  right: {
    enter: "translate-x-full",
    enterActive: "!translate-x-0 transition-transform duration-300 ease-out",
    exitActive: "translate-x-full transition-transform duration-200 ease-in",
  },
  top: {
    enter: "-translate-y-full",
    enterActive: "!translate-y-0 transition-transform duration-300 ease-out",
    exitActive: "-translate-y-full transition-transform duration-200 ease-in",
  },
  bottom: {
    enter: "translate-y-full",
    enterActive: "!translate-y-0 transition-transform duration-300 ease-out",
    exitActive: "translate-y-full transition-transform duration-200 ease-in",
  },
};

// A képernyő széle felé eső oldal szögletes, a befelé néző lekerekített.
const POSITION = {
  left: `h-full w-80 max-w-[85vw] rounded-r-3xl`,
  right: `h-full w-80 max-w-[85vw] rounded-l-3xl`,
  top: `w-full max-h-[85vh] rounded-b-3xl`,
  bottom: `w-full max-h-[85vh] rounded-t-3xl`,
};

export const sidebar = {
  // A maszk elrendezését (fixed, igazítás az oldal szerint) a PrimeReact
  // inline stílusa adja; itt csak a sötétítés és az elmosás.
  mask: ({ props }) => ({
    className: classNames(props.modal !== false && "bg-black/40 backdrop-blur-sm animate-fade-in"),
  }),

  root: ({ props }) => ({
    className: classNames(
      "relative flex flex-col overflow-hidden bg-white",
      SHADOW["2xl"],
      POSITION[props.position] ?? POSITION.left
    ),
  }),

  transition: ({ props }) => ({
    classNames: TRANSITIONS[props.position] ?? TRANSITIONS.left,
  }),

  // Fejlécsáv SZE-kék színátmenettel; a tartalmát a SZE Sidebar `title`/`subtitle` propja adja.
  header: {
    className: "flex items-start justify-between gap-3 bg-gradient-to-br from-sze-primary to-sze-primary-800 px-6 py-5 text-white",
  },

  icons: { className: "flex items-center gap-1 -mr-2" },

  // A sötét sávon a Button text variánsának fehér megfelelője.
  closeButton: {
    className: classNames(...BUTTON_BASE, `h-9 w-9 shrink-0 ${RADIUS.full}`, "text-white hover:bg-white/15"),
  },
  closeIcon: { className: "w-4 h-4" },

  content: { className: "flex min-h-0 flex-1 flex-col overflow-y-auto" },
};
