import { RADIUS } from "../tokens";

export const tree = {
  root: {
    className: `bg-white border border-gray-200 ${RADIUS.lg} p-4 text-sm`
  },
  node: {
    className: 'p-2 hover:bg-sze-primary-50 rounded transition-colors'
  },
  nodeLabel: {
    className: 'text-gray-700 font-medium'
  },
  nodeIcon: {
    className: 'text-sze-primary'
  }
};
