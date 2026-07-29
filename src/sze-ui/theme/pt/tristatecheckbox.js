import { RADIUS, BORDER_WIDTH, DURATION } from "../tokens";

export const tristatecheckbox = {
  root: {
    className: "inline-flex items-center"
  },
  wrapper: {
    className: `w-5 h-5 ${BORDER_WIDTH.thick} border-sze-primary ${RADIUS.md} bg-white hover:bg-sze-primary-50 transition-colors ${DURATION.normal}`
  },
  box: { 
    className: "w-full h-full flex items-center justify-center" 
  },
  icon: { 
    className: "text-current text-sm" 
  },
};
