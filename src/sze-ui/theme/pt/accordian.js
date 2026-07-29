import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION } from "../tokens";

/**
 * Accordian Pass-Through (PT) stílusok
 * 
 * Ez a fájl az Accordian komponens összes Tailwind stílusát tartalmazza.
 * A PrimeReact "unstyled mode" + Pass-Through pattern segítségével működik.
 * 
 * Szerkezete:
 * - root: az egész accordion konténer
 * - item: az accordion tab item
 * - tab: a tab fejléc gomb
 * - panel: a tab tartalma
 */
export const accordianPT = {
  /**
   * root: az Accordian gyökér elemének stílusa
   */
  root: {
    className: `w-full bg-white ${RADIUS["2xl"]} ${SHADOW.md} overflow-hidden`
  },

  /**
   * item: az accordion item (tab + panel pár)
   */
  item: {
    className: "border-b border-sze-primary-100 last:border-b-0"
  },

  /**
   * tab: a tab fejléc gomb
   * 
   * Stílusa:
   * - Alapszín: SZE primary
   * - Háttér: svetly szürke default, sötét kék hover-kor
   * - Textszín: sötét kék default, fehér hover-kor
   * - Padding: nagyobb, megfelelő kezelhetőség
   * - Transition: sima átmenet az összes tulajdonságban
   * - Ikon igazítás: jobbra
   */
  tab: ({ context }) => ({
    className: classNames(
      "w-full",
      "flex items-center justify-between",
      "px-6 py-4",
      "bg-sze-primary-50 hover:bg-sze-primary-100",
      "text-sze-primary font-semibold",
      "cursor-pointer select-none",
      `transition-all ${DURATION.normal}`,
      "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sze-secondary",
      {
        "bg-sze-primary text-white": context.selected
      }
    )
  }),

  /**
   * tabTitle: a tab fejléc szövege
   */
  tabTitle: {
    className: "text-base"
  },

  /**
   * tabPanelContainer: a tab panel tárolója
   */
  tabpanel: {
    className: "p-6 text-gray-700 bg-white"
  },

  /**
   * tabPanelContent: a tab panel tartalma
   */
  tabpanelContent: {
    className: "text-sm leading-relaxed"
  }
};
