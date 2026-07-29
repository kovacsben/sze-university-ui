import { RADIUS, DURATION } from "../tokens";

export const progressbar = {
  root: {
    className: `bg-gray-200 ${RADIUS.full} overflow-hidden`
  },
  value: {
    className: `bg-sze-primary h-full transition-all ${DURATION.slower}`
  },
  label: {
    className: 'text-sze-primary font-semibold text-sm'
  }
};
