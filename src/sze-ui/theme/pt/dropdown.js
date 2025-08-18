import { classNames } from "primereact/utils";

export const dropdownPT = {
  
  root: {
    className:
      "relative inline-flex h-10 items-center rounded-3xl border border-black/15 " +
      "bg-white pl-3 pr-10 " + 
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-sze-secondary " +
      "focus-within:ring-offset-2 ring-offset-white dark:ring-offset-neutral-900",
  },

  
  input: { className: "flex-1 min-w-0 truncate" },

  
  trigger: {
    className:
      "absolute right-2 top-1/2 -translate-y-1/2 " + 
      "h-7 w-7 rounded-lg flex items-center justify-center " +
      "text-sze-primary hover:bg-sze-primary/10 transition",
  },

  
  panel: { className: "mt-1 rounded-xl border bg-white p-1 shadow-lg" },

  item: ({ context }) => ({
    className: classNames(
      "px-3 py-2 rounded-lg cursor-pointer",
      context.focused && "bg-sze-primary/10",
      context.selected && "bg-sze-primary/20"
    ),
  }),

  emptyMessage: { className: "px-3 py-2 text-black/60" },

  
  clearIcon: {
    className:
      "absolute right-10 top-1/2 -translate-y-1/2 text-black/50 hover:text-black",
  },
};
