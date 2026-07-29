import { RADIUS, SHADOW, DURATION } from "../tokens";

export const menu = {
  root: {
    className: `bg-white border border-sze-primary-200 ${RADIUS.lg} ${SHADOW.md} overflow-hidden`
  },
  menu: {
    className: 'outline-none'
  },
  menuitem: {
    className: `flex items-center px-4 py-3 hover:bg-sze-primary-50 cursor-pointer transition-colors ${DURATION.normal} border-b border-sze-primary-100 last:border-b-0`
  },
  menuitemtext: {
    className: 'text-gray-700 font-medium'
  },
  icon: {
    className: 'text-sze-primary mr-3'
  },
  submenu: {
    className: 'bg-sze-primary-50 border-l-4 border-sze-primary-300'
  }
};
