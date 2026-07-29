import { SHADOW } from "../tokens";

export const sidebar = {
  root: {
    className: `bg-sze-primary-50 ${SHADOW.lg}`
  },
  header: {
    className: 'bg-sze-primary text-white p-4 font-semibold flex items-center justify-between'
  },
  content: {
    className: 'p-4'
  },
  closeButton: {
    className: 'text-white hover:bg-sze-primary-600'
  }
};
