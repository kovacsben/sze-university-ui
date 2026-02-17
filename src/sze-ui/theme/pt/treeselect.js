import { classNames } from "primereact/utils";
export const treeSelectPT = {
  root: { className: "relative inline-flex w-72 h-10 items-center rounded-2xl border border-black/15 bg-white pl-3 pr-10" },
  label: { className: "truncate" },
  trigger: { className: "absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg flex items-center justify-center hover:bg-sze-primary/10" },
  panel: { className: "mt-1 rounded-xl border bg-white p-2 shadow-lg w-72" },
  node: ({ context }) => ({
    className: classNames(
      "px-2 py-1 rounded-md cursor-pointer flex items-center gap-2",
      context.selected && "bg-sze-primary/20 text-sze-primary",
      context.focused && "bg-sze-primary/10"
    ),
  }),
  checkbox: { className: "w-4 h-4 rounded border border-black/25" },
};
