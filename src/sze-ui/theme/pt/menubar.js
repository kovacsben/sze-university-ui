import { RADIUS, SHADOW, DURATION } from "../tokens";

export const menubar = {
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
    className: `bg-white text-gray-700 ${SHADOW.lg} rounded mt-0`
  },
  submenuitem: {
    className: `px-4 py-3 text-gray-700 hover:text-sze-primary hover:bg-gray-100 transition-colors ${DURATION.normal} border-b border-gray-200 last:border-b-0`
  }
};
