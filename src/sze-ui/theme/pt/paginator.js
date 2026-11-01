import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION } from "../tokens";
import { BUTTON_BASE, buttonVariantClasses } from "./button";

/**
 * Paginator Pass-Through (PT) stílusok
 *
 * Szerkezet: root > left (találatszám) | lapozógombok | end ("/ oldal" választó).
 * A `left` és az `end` egyformán flex-1, így a köztük lévő gombok pontosan
 * középre kerülnek (lásd components/Paginator/Paginator.jsx).
 *
 * A korábbi PT nem létező szekciókat (paginatorContainer, paginatorLeft...)
 * stílusozott, ezért a gombok teljesen formázatlanok voltak.
 *
 * A gombok a Button `text` variánsát kapják (BUTTON_BASE + buttonVariantClasses,
 * mint a SelectButton), az aktív oldal a SOLID variánst.
 */

const NAV_BUTTON = ({ context }) => ({
  className: classNames(
    ...BUTTON_BASE,
    `h-9 min-w-9 px-2 ${RADIUS.full} text-sm`,
    buttonVariantClasses({ text: true, hoverLift: false }),
    context?.disabled && "opacity-40 pointer-events-none"
  ),
});

const NAV_ICON = { className: "w-3.5 h-3.5" };

export const paginator = {
  root: {
    className: classNames(
      `flex flex-wrap items-center gap-3 bg-white border border-black/10 ${RADIUS.xl} ${SHADOW.sm} px-4 py-3`
    ),
  },

  left: { className: "flex flex-1 items-center min-w-max" },
  end: { className: "flex flex-1 items-center justify-end min-w-max" },

  pages: { className: "flex items-center gap-1" },

  pageButton: ({ context }) => ({
    className: classNames(
      ...BUTTON_BASE,
      `h-9 min-w-9 px-2 ${RADIUS.full} text-sm tabular-nums transition-colors ${DURATION.fast}`,
      context.active
        ? "bg-sze-primary text-white font-semibold shadow-sm"
        : buttonVariantClasses({ text: true, hoverLift: false })
    ),
  }),

  firstPageButton: NAV_BUTTON,
  prevPageButton: NAV_BUTTON,
  nextPageButton: NAV_BUTTON,
  lastPageButton: NAV_BUTTON,
  firstPageIcon: NAV_ICON,
  prevPageIcon: NAV_ICON,
  nextPageIcon: NAV_ICON,
  lastPageIcon: NAV_ICON,
};
