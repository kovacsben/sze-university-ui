import { RADIUS, BORDER_WIDTH, DURATION } from "../tokens";

/**
 * A TriStateCheckbox nem rendel `wrapper` szekciót – a látható négyzet maga a
 * `box`, ezért a méret és a keret is oda kerül (korábban a `wrapper`-en ült,
 * így a doboz 0x0 méretű és kattinthatatlan volt).
 */
export const tristatecheckbox = {
  root: {
    className: "inline-flex items-center"
  },
  box: {
    className:
      `w-5 h-5 ${BORDER_WIDTH.thick} border-sze-primary ${RADIUS.md} bg-white ` +
      `flex items-center justify-center cursor-pointer text-sze-primary ` +
      `hover:bg-sze-primary-50 transition-colors ${DURATION.normal} ` +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary"
  },
  checkIcon: { className: "text-current text-sm" },
  uncheckIcon: { className: "text-current text-sm" },
};
