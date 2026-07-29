import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";


export const editorPT = {
  // külső keret (root)
  root: {
    className:
      `${RADIUS["2xl"]} border border-black/15 bg-white ` +
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-sze-secondary " +
      "focus-within:ring-offset-2 ring-offset-white dark:ring-offset-neutral-900",
  },

  // felső eszköztár tartó
  toolbar: {
    className:
      "px-3 py-2 border-b border-black/10 flex flex-wrap items-center gap-1",
  },

  // Quill szerkesztő konténer + belső editor
  content: {
    className: "min-h-56", // kb. 224px
  },

  // opcionális: footer (ha később akarsz alsó státuszt)
  footer: { className: "px-3 py-2 border-t border-black/10 text-black/60" },
};
