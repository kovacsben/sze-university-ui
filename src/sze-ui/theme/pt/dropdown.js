import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION, controlSize } from "../tokens";

export const dropdownPT = {
  root: ({ props }) => {
    // Alapértelmezett magasság h-11 (a Dropdown saját, szándékosan magasabb defaultja),
    // de a size prop-pal felülírható a közös CONTROL_SIZE skálára.
    const heightCls = props.size ? controlSize(props.size).height : "h-11";
    const radiusCls = RADIUS[props.radius] ?? RADIUS.xl;
    return {
      className: classNames(
        `relative inline-flex ${heightCls} items-center ${radiusCls} border border-black/10`,
        `bg-white pl-4 pr-10 transition-all ${DURATION.normal}`,
        "hover:border-sze-primary/50 cursor-pointer", // Hoverre bevillan az egyetemi szín
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-sze-secondary focus-within:ring-offset-2"
      ),
    };
  },

  input: {
    className: "flex-1 min-w-0 truncate text-gray-700 font-medium"
  },

  trigger: {
    className: classNames(
      "absolute right-2 top-1/2 -translate-y-1/2",
      `h-8 w-8 ${RADIUS.lg} flex items-center justify-center`,
      "text-sze-primary hover:bg-sze-primary/10 transition-colors"
    ),
  },

  // --- ITT A FIX A HÁTTÉRRE ---
  panel: {
    className: classNames(
      `mt-2 ${RADIUS.xl} border border-gray-100 ${SHADOW["2xl"]}`, // Erősebb árnyék, hogy elváljon a háttértől
      "bg-white outline-none z-50", // Explicit FEHÉR háttér és magas z-index
      "overflow-hidden" // Hogy az itemek ne lógjanak ki a lekerekítésnél
    )
  },

  list: {
    className: "py-2" // Egy kis belső padding a listának
  },

  item: ({ context }) => ({
    className: classNames(
      `px-4 py-3 cursor-pointer transition-all ${DURATION.fast}`,
      "text-gray-700 flex items-center gap-2",
      
      // Hover állapot (fókuszált)
      context.focused && !context.selected && "bg-gray-50 text-sze-primary",
      
      // Kijelölt állapot
      context.selected && "bg-sze-primary text-white font-semibold",
      
      // Ha kijelölt ÉS fókuszált (pl. nyilakkal mész rá)
      context.selected && context.focused && "bg-sze-primary/90"
    ),
  }),

  emptyMessage: { 
    className: "px-4 py-3 text-gray-400 italic text-sm bg-white" 
  },

  clearIcon: {
    className: "absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors",
  },
};