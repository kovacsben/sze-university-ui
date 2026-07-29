import { RADIUS, BORDER_WIDTH, DURATION } from "../tokens";

export const inplace = {
  root: {
    className: 'inline-flex'
  },
  display: {
    className: `cursor-pointer px-3 py-2 ${RADIUS.lg} ${BORDER_WIDTH.thick} border-transparent hover:border-sze-primary-200 transition-all ${DURATION.normal} text-gray-800`
  },
  content: {
    className: 'flex gap-2 items-center p-2'
  }
};
