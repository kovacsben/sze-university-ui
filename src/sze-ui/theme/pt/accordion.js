import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION } from "../tokens";

/**
 * Accordion Pass-Through (PT) stílusok
 *
 * Kulcs: `accordion` (a PrimeReact belső neve). A korábbi `accordian` kulcsot
 * a PrimeReact sosem olvasta, ezért az Accordion teljesen stílus nélkül
 * jelent meg: a fülek egybefolytak, a nyíl pedig a cím FÖLÉ került, mert a
 * fejléc-link (<a>) nem volt flex konténer.
 *
 * Szerkezet: root > accordiontab.root > header > headeraction (<a>) > headericon + headertitle,
 *                                     > toggleablecontent > content
 * A fül-szekciók függvényei a `context`-ben kapják a fül állapotát
 * (selected, disabled, first, last, index).
 *
 * Elkülönítés: a fülek külön kártyák térközzel; a nyitott fül fejléce
 * kitöltött SZE-kék, a kártya kiemelt árnyékot és keretet kap.
 */
export const accordionPT = {
  root: { className: "flex w-full flex-col gap-3" },

  accordiontab: {
    root: ({ context }) => ({
      className: classNames(
        `overflow-hidden ${RADIUS["2xl"]} border bg-white transition-all ${DURATION.normal}`,
        context.selected
          ? `border-sze-primary/30 ${SHADOW.lg}`
          : `border-black/10 ${SHADOW.sm} hover:border-sze-primary/30`
      ),
    }),

    header: { className: "w-full" },

    headeraction: ({ context }) => ({
      className: classNames(
        "flex w-full items-center gap-3 px-5 py-4 font-semibold select-none cursor-pointer no-underline",
        `transition-colors ${DURATION.normal}`,
        "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sze-secondary",
        context.selected
          ? "bg-sze-primary text-white"
          : "text-sze-primary hover:bg-sze-primary-50",
        context.disabled && "opacity-60 pointer-events-none"
      ),
    }),

    // A nyíl a cím ELŐTT, egy körben - a nyitott fülön áttetsző fehér.
    headericon: ({ context }) => ({
      className: classNames(
        `h-7 w-7 shrink-0 p-1.5 ${RADIUS.full} transition-colors ${DURATION.normal}`,
        context.selected ? "bg-white/15 text-white" : "bg-sze-primary/10 text-sze-primary"
      ),
    }),

    headertitle: { className: "text-base leading-snug" },

    toggleablecontent: { className: "border-t border-sze-primary/10" },

    content: { className: "px-5 py-4 text-sm leading-relaxed text-gray-700" },
  },
};
