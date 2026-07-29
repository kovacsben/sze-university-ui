import { RADIUS } from "../tokens";

export const sliderPT = {
  root: { className: `relative bg-sze-third h-2 w-64 ${RADIUS.full} touch-action-none` },
  range: { className: `absolute h-full ${RADIUS.full} bg-sze-secondary pointer-events-none` },
  handle: { className: `absolute -top-2 size-6 ${RADIUS.full} border border-black/20 bg-white ring-2 ring-sze-primary focus:outline-none focus:ring-2 focus:ring-sze-secondary cursor-grab active:cursor-grabbing touch-action-none select-none` },
};
