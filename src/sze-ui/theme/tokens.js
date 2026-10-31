/**
 * SZE UI központi design tokenek
 *
 * Ez az EGYETLEN hely, ahol a lekerekítés, méretskála, betűméret, árnyék,
 * border-vastagság és animáció-időzítés értékei definiálva vannak. Minden
 * PT fájl (src/sze-ui/theme/pt/*.js) innen olvassa ezeket kulcs alapján -
 * ha itt módosul egy érték, minden komponensen érvényesül.
 *
 * FONTOS: minden érték TELJES, literál Tailwind classnév kell legyen.
 * Tailwind v4 a forráskódot statikusan szkenneli - egy összefűzött/
 * interpolált classnév-töredék (pl. `rounded-${x}`) build közben
 * csendben kimarad a generált CSS-ből.
 */

export const RADIUS = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

/** Csak jobb oldali lekerekítés – összetett kontrollokhoz (pl. InputNumber gombokkal). */
export const RADIUS_R = {
  none: "rounded-r-none",
  sm: "rounded-r-sm",
  md: "rounded-r-md",
  lg: "rounded-r-lg",
  xl: "rounded-r-xl",
  "2xl": "rounded-r-2xl",
  "3xl": "rounded-r-3xl",
  full: "rounded-r-full",
};

export const CONTROL_SIZE = {
  sm: { height: "h-9", padding: "px-3", text: "text-sm" },
  md: { height: "h-10", padding: "px-4", text: "text-sm" },
  lg: { height: "h-11", padding: "px-5", text: "text-base" },
};

export const AVATAR_SIZE = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

export const FONT_SIZE = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export const SHADOW = {
  sm: "shadow-sm",
  base: "shadow",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

export const BORDER_WIDTH = {
  thin: "border",
  thick: "border-2",
};

export const DURATION = {
  fast: "duration-150",
  normal: "duration-200",
  slow: "duration-300",
  slower: "duration-500",
};

/**
 * PrimeReact natív size prop értékek ("small"/"large") leképezése
 * a CONTROL_SIZE token-kulcsokra ("sm"/"lg"), hogy a publikus komponens-API
 * (pl. <Button size="small">) ne törjön el a tokenesítés bevezetésével.
 */
export const CONTROL_SIZE_ALIAS = {
  small: "sm",
  large: "lg",
};

export function controlSize(size) {
  const key = CONTROL_SIZE_ALIAS[size] || size;
  return CONTROL_SIZE[key] || CONTROL_SIZE.md;
}

/**
 * Avatar natív size prop értékek ("small"/"large"/"xlarge") leképezése
 * az AVATAR_SIZE token-kulcsokra ("sm"/"lg"/"xl").
 */
export const AVATAR_SIZE_ALIAS = {
  small: "sm",
  large: "lg",
  xlarge: "xl",
};

export function avatarSize(size) {
  const key = AVATAR_SIZE_ALIAS[size] || size;
  return AVATAR_SIZE[key] || AVATAR_SIZE.md;
}
