import { RADIUS } from "../tokens";

/**
 * ScrollPanel Pass-Through (PT) stílusok
 *
 * A PrimeReact a saját CSS-ében adná a belső elemek magasságát és a
 * görgetést (`.p-scrollpanel-wrapper`, `.p-scrollpanel-content`), de azt
 * unstyled módban nem injektálja be. Enélkül a szerkezet így nézett ki:
 *
 *   root    h=300  overflow:hidden   <- a tartalom itt egyszerűen levágódott
 *     wrapper h=948 overflow:visible
 *       content h=948 overflow:visible  <- sehol nem volt görgetés
 *
 * Vagyis a "görgethető panel" nem görgetett, csak csonkolt. A wrapper és a
 * content itt veszi fel a gyökér magasságát, a görgetés pedig a contenten
 * történik.
 */
export const scrollpanel = {
  root: {
    className: `bg-white border border-gray-200 ${RADIUS.lg} overflow-hidden`,
  },
  wrapper: {
    className: "h-full overflow-hidden",
  },
  content: {
    className: "h-full overflow-y-auto overflow-x-hidden p-4",
  },
  barX: {
    className: "bg-sze-primary-200 hover:bg-sze-primary-300",
  },
  barY: {
    className: "bg-sze-primary-200 hover:bg-sze-primary-300",
  },
};
