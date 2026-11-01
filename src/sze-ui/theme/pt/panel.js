import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION } from "../tokens";
import { buttonVariantClasses } from "./button";

/**
 * Panel Pass-Through (PT) stílusok
 *
 * Szerkezet: root > header (title + icons > toggler > togglericon),
 *                   toggleablecontent > content, footer
 *
 * A teljes fejléc kattintható: a toggler gomb `after:` pszeudo-eleme
 * (absolute inset-0) a `relative` fejléc egész felületét lefedi. Így a
 * kattintás mindenhol a valódi <button>-ra érkezik - az aria-expanded,
 * az aria-controls és a billentyűzetes kezelés a PrimeReact gombján marad.
 * Korábban csak az apró, formázatlan +/- ikonra lehetett kattintani.
 */
export const panel = {
  root: {
    className: `bg-white border border-black/10 ${RADIUS["2xl"]} ${SHADOW.sm} overflow-hidden`,
  },

  header: {
    className: classNames(
      "relative flex items-center justify-between gap-3 px-5 py-4",
      `transition-colors ${DURATION.normal} hover:bg-sze-primary-50`
    ),
  },

  title: { className: "font-semibold text-sze-primary" },

  icons: { className: "flex items-center gap-1" },

  // A Button text variánsa, de a BUTTON_BASE nélkül: annak `active:translate-y-px`
  // osztálya lenyomáskor transformot tenne a gombra, a transform pedig új
  // tartalmazó blokkot hoz létre - az after: réteg ilyenkor a 32px-es gombra
  // zsugorodna, az egér felengedése a gombon kívülre esne, és elmaradna a click.
  toggler: {
    className: classNames(
      `flex h-8 w-8 shrink-0 items-center justify-center ${RADIUS.full}`,
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
      buttonVariantClasses({ text: true, hoverLift: false }),
      // A kattintási felület kiterjesztése a teljes fejlécre:
      "after:absolute after:inset-0 after:content-['']"
    ),
  },

  toggleablecontent: { className: "border-t border-black/5" },

  content: { className: "px-5 py-4 text-sm leading-relaxed text-gray-700" },

  footer: { className: "border-t border-black/5 bg-gray-50/80 px-5 py-3" },
};
