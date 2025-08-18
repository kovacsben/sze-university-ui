import { classNames } from "primereact/utils";

export const inputNumberPT = {
  root: { className: "inline-flex items-stretch rounded-2xl border border-black/15 bg-white" },

  input: {
    className:
      "h-10 px-3 rounded-l-2xl outline-none bg-transparent " +
      "focus-visible:ring-2 focus-visible:ring-sze-secondary",
  },

  // jobb oldali +/– gombok (showButtons esetén)
  buttonGroup: { className: "flex flex-col border-l border-black/15 rounded-r-2xl overflow-hidden" },
  incrementButton: {
    className:
      "h-5 flex items-center justify-center text-sze-primary hover:bg-sze-primary/10",
  },
  decrementButton: {
    className:
      "h-5 flex items-center justify-center text-sze-primary hover:bg-sze-primary/10 border-t border-black/10",
  },
};
