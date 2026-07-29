import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION, BORDER_WIDTH, avatarSize } from "../tokens";

/**
 * Avatar Pass-Through (PT) stílusok
 * 
 * Ez a fájl az Avatar komponens összes Tailwind stílusát tartalmazza.
 * A PrimeReact "unstyled mode" + Pass-Through pattern segítségével működik.
 * 
 * Szerkezete:
 * - root: az avatar gyökér elemének stílusa
 * - image: az avatar képe
 * - label: szöveges avatar (betűk)
 */
export const avatarPT = {
  /**
   * root: az Avatar gyökér elemének stílusa
   * 
   * Méretváltozatok:
   * - small: w-8 h-8 (32px)
   * - normal: w-10 h-10 (40px) - alapértelmezett
   * - large: w-12 h-12 (48px)
   * - xlarge: w-16 h-16 (64px)
   * 
   * Alak:
   * - circle: rounded-full
   * - square: rounded-lg
   */
  root: ({ props }) => {
    // Méretváltozatok - a központi AVATAR_SIZE tokenből (src/sze-ui/theme/tokens.js)
    const sizeCls = avatarSize(props.size);

    // Alak meghatározása
    const shapeCls =
      props.shape === "square" ? RADIUS.lg
                               : RADIUS.full; // circle (default)

    return {
      className: classNames(
        "inline-flex items-center justify-center",
        "flex-shrink-0",
        "font-semibold",
        `transition-all ${DURATION.normal}`,
        "bg-gradient-to-br from-sze-primary to-sze-primary-900",
        "text-white",
        `${BORDER_WIDTH.thick} border-sze-primary-100`,
        `${SHADOW.md} hover:shadow-lg`,
        "overflow-hidden",
        sizeCls,
        shapeCls
      )
    };
  },

  /**
   * image: az avatar képe
   */
  image: {
    className: "w-full h-full object-cover"
  },

  /**
   * label: szöveges avatar (betűk vagy ikon)
   */
  label: {
    className: "font-semibold leading-none"
  },

  /**
   * icon: az avatar ikája
   */
  icon: {
    className: "text-current"
  }
};
