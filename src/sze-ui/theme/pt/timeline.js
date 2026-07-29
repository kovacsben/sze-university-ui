import { RADIUS, SHADOW } from "../tokens";

export const timeline = {
  root: {
    className: 'timeline-container'
  },
  event: {
    className: 'timeline-event mb-4'
  },
  marker: {
    className: `flex items-center justify-center w-10 h-10 ${RADIUS.full} bg-sze-primary text-white font-semibold`
  },
  connector: {
    className: 'bg-sze-primary-200'
  },
  content: {
    className: `bg-white border border-gray-200 ${RADIUS.lg} p-4 ${SHADOW.sm}`
  }
};
