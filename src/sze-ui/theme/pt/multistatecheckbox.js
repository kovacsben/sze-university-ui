import { RADIUS, BORDER_WIDTH, DURATION } from "../tokens";

/**
 * A MultiStateCheckbox a belső `checkbox` szekción keresztül rajzolja a
 * négyzetet, `wrapper` szekciója nincs – a méret és a keret ezért a `box`-ra
 * kerül.
 */
export const multistatecheckbox = {
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
  icon: {
    className: "text-current text-sm"
  },
};
