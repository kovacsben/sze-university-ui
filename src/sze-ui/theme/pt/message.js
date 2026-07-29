import { RADIUS } from "../tokens";

export const message = {
  root: {
    className: `flex items-center p-4 ${RADIUS.lg} border-l-4`
  },
  icon: {
    className: 'flex-shrink-0 mr-3'
  },
  text: {
    className: 'flex-1'
  },
  button: {
    className: 'flex-shrink-0 ml-3 p-2'
  }
};

export const messages = {
  root: {
    className: 'space-y-3'
  },
  message: {
    className: `flex items-center gap-3 p-4 ${RADIUS.lg}`
  }
};
