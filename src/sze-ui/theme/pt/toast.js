import { RADIUS, SHADOW } from "../tokens";

export const toast = {
  root: {
    className: 'gap-4'
  },
  message: {
    className: `bg-white border border-gray-200 ${RADIUS.lg} ${SHADOW.lg} overflow-hidden`
  },
  messageContent: {
    className: 'p-4 flex items-center gap-3'
  }
};
