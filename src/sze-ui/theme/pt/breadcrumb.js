import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION } from "../tokens";

/**
 * Breadcrumb Pass-Through (PT) stílusok
 * 
 * Ez a fájl a Breadcrumb komponens összes Tailwind stílusát tartalmazza.
 * A PrimeReact "unstyled mode" + Pass-Through pattern segítségével működik.
 * 
 * Szerkezete:
 * - root: a breadcrumb gyökér elemének stílusa
 * - item: az egyes breadcrumb elemek
 * - itemLink: a clickable linkek
 * - separator: az elemek közötti elválasztó (/)
 */
export const breadcrumbPT = {
  /**
   * root: a Breadcrumb gyökér elemének stílusa
   */
  root: {
    className: `flex items-center gap-2 px-4 py-3 bg-white ${RADIUS.lg} border border-sze-primary-100 ${SHADOW.sm}`
  },

  /**
   * container: a breadcrumb lista konténere
   */
  container: {
    className: "flex items-center gap-2"
  },

  /**
   * list: az listaelemek
   */
  list: {
    className: "flex items-center gap-2"
  },

  /**
   * item: az egyes breadcrumb elemek
   */
  item: {
    className: "flex items-center"
  },

  /**
   * itemLink: a clickable linkek
   * 
   * Stílusa:
   * - Alapszín: SZE primary
   * - Hover: secondary szín
   * - Transition: sima átmenet
   * - Cursor: pointer
   */
  itemLink: ({ context }) => ({
    className: classNames(
      "flex items-center gap-2",
      "text-sze-primary font-medium text-sm",
      "hover:text-sze-secondary",
      `transition-colors ${DURATION.normal}`,
      "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sze-secondary",
      "cursor-pointer",
      {
        "text-gray-500 cursor-default hover:text-gray-500": context.disabled
      }
    )
  }),

  /**
   * itemIcon: az egyes elemek ikája
   */
  itemIcon: {
    className: "text-current"
  },

  /**
   * itemLabel: az elem szövege
   */
  itemLabel: {
    className: "font-medium"
  },

  /**
   * separator: az elemek közötti elválasztó (/)
   */
  separator: {
    className: "text-sze-primary-300 mx-1 text-sm"
  }
};
