import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION, controlSize } from "../tokens";

/**
 * TreeSelect Pass-Through (PT) stílusok
 *
 * A mező a Dropdown-éval azonos (h-11 alapmagasság, xl lekerekítés, hover-keret,
 * fókuszgyűrű), mert a felhasználónak ugyanaz a "lenyíló választó" szerepe.
 *
 * A panelben a PrimeReact egy beágyazott Tree-t renderel, ez a globális
 * `tree` PT-t is megkapja (vezetővonal, levélelemek nyila stb.); a lenti
 * `tree` kulcs csak a keretét veszi el, mert azt itt a panel adja.
 */
export const treeSelectPT = {
  root: ({ props }) => {
    const heightCls = props.size ? controlSize(props.size).height : "h-11";
    const radiusCls = RADIUS[props.radius] ?? RADIUS.xl;
    return {
      className: classNames(
        `relative inline-flex ${heightCls} items-center ${radiusCls} border border-black/10`,
        `bg-white pl-4 pr-10 transition-all ${DURATION.normal}`,
        "hover:border-sze-primary/50 cursor-pointer",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-sze-secondary focus-within:ring-offset-2",
        props.disabled && "opacity-60 pointer-events-none"
      ),
    };
  },

  labelContainer: { className: "flex-1 min-w-0" },

  // Üres értéknél a placeholder halványabb, mint a Dropdown-nál.
  label: ({ props }) => ({
    className: classNames(
      "truncate font-medium",
      props.value && Object.keys(props.value).length ? "text-gray-700" : "text-gray-400"
    ),
  }),

  trigger: {
    className: classNames(
      "absolute right-2 top-1/2 -translate-y-1/2",
      `h-8 w-8 ${RADIUS.lg} flex items-center justify-center`,
      "text-sze-primary hover:bg-sze-primary/10 transition-colors"
    ),
  },

  panel: {
    className: classNames(
      `mt-2 ${RADIUS.xl} border border-gray-100 ${SHADOW["2xl"]}`,
      "bg-white outline-none z-50 overflow-hidden",
      // A szakok nevei hosszúak: a panel legalább a mező szélessége, de nőhet.
      "min-w-full w-max max-w-md"
    ),
  },

  /* Fejléc: keresőmező (filter esetén) + bezáró gomb. A bezáró gomb filter
     nélkül is megjelenik, ezért jobbra igazítjuk. */
  header: { className: "flex items-center justify-end gap-2 border-b border-gray-100 p-2" },
  filterContainer: { className: "relative flex-1" },
  filter: {
    className:
      `w-full h-9 ${RADIUS.xl} border border-black/15 bg-sze-third/20 pl-3 pr-9 text-sm ` +
      "placeholder:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sze-primary",
  },
  filterIcon: { className: "absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sze-primary pointer-events-none" },
  closeButton: {
    className:
      `h-8 w-8 shrink-0 ${RADIUS.full} flex items-center justify-center text-sze-primary ` +
      "hover:bg-sze-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
  },
  closeIcon: { className: "w-3.5 h-3.5" },

  // A wrapper kapja a scrollHeight-ot (max-height), de az overflow-t a
  // PrimeReact CSS-e adná – unstyled módban enélkül a lista kilógna.
  wrapper: { className: "overflow-auto p-2" },

  tree: {
    root: { className: "!border-0 !p-0 text-sm" },
  },

  emptyMessage: { className: "px-4 py-3 text-gray-400 italic text-sm" },

  clearIcon: {
    className: "absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-danger transition-colors",
  },
};
