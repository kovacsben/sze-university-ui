import { RADIUS, SHADOW } from "../tokens";

export const panel = {
  root: {
    className: `bg-white border border-gray-200 ${RADIUS.lg} ${SHADOW.sm} overflow-hidden`
  },
  header: {
    className: 'bg-sze-primary text-white font-semibold p-4 cursor-pointer hover:bg-sze-primary-700 transition-colors'
  },
  content: {
    className: 'p-4 text-gray-700 border-t border-gray-200'
  }
};
