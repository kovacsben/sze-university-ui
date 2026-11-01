import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";

/**
 * ProgressBar Pass-Through (PT) stílusok
 *
 * Szerkezet (determinate): root (role=progressbar) > value (szélesség = érték%) > label
 *
 * A SZE ProgressBar helyi `pt` propként adja át a `progressBarPT(...)`
 * eredményét (mint az InputNumber), mert a magasság és az animáció a
 * wrapper saját propjaitól függ, ezek pedig nem PrimeReact-propok - a
 * PrimeReact-nak átadva a DOM-ig jutnának. A globális `progressbar` kulcs
 * az alapértelmezett változat, a közvetlenül használt PrimeReact ProgressBar-hoz.
 */

const HEIGHT = { sm: "h-2", md: "h-3", lg: "h-5" };

/**
 * @param {object}  o
 * @param {"sm"|"md"|"lg"} o.size  - a sáv vastagsága
 * @param {boolean} o.animated     - mozgó csíkos kitöltés
 */
export function progressBarPT({ size = "md", animated = false } = {}) {
  return {
    root: {
      className: classNames("relative w-full overflow-hidden bg-sze-primary/10", HEIGHT[size] ?? HEIGHT.md, RADIUS.full),
    },
    value: {
      className: classNames(
        "h-full bg-sze-primary",
        RADIUS.full,
        // Az érték változását a szélesség puha átmenete mutatja.
        "transition-[width] duration-500 ease-out",
        // .sze-progress-stripes: index.css, animate-progress-stripes: @theme
        animated && "sze-progress-stripes animate-progress-stripes"
      ),
    },
    label: { className: "sr-only" },
  };
}

export const progressbar = progressBarPT();
