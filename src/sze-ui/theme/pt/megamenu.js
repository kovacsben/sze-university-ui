import { RADIUS, SHADOW, DURATION } from "../tokens";

export const megamenu = {
  root: {
    className: `bg-white border border-sze-primary-200 ${RADIUS.lg} ${SHADOW.md}`
  },
  menu: {
    className: 'flex items-center bg-sze-primary text-white p-0 m-0 list-none outline-none'
  },
  menuitem: {
    className: `flex items-center px-4 py-3 hover:bg-sze-primary-700 cursor-pointer transition-colors ${DURATION.normal}`
  },
  menuitemtext: {
    className: 'font-medium'
  },
  submenu: {
    className: 'bg-sze-primary-50 border-l-4 border-sze-primary-300 p-4'
  },
  submenuheader: {
    className: 'text-sm font-semibold text-sze-primary mb-3'
  },
  submenuitem: {
    className: `px-3 py-2 text-gray-700 hover:text-sze-primary hover:bg-gray-100 rounded cursor-pointer transition-colors ${DURATION.normal}`
  }
};
