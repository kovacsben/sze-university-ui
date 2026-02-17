import { classNames } from "primereact/utils";
export const multiSelectPT = {
  root: { className: "relative inline-flex w-72 h-10 items-center rounded-2xl border border-black/15 bg-white pl-3 pr-10" },
  label: { className: "truncate" },
  trigger: { className: "absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg flex items-center justify-center hover:bg-sze-primary/10" },
  panel: { className: "mt-1 rounded-xl border bg-white p-2 shadow-lg w-72" },
  item: ({ context }) => ({
    className: classNames(
      "px-3 py-2 rounded-lg cursor-pointer",
      context.selected && "bg-sze-primary/20 text-sze-primary",
      context.focused && "bg-sze-primary/10"
    ),
  }),
  header: { className: "p-2 border-b border-black/10 flex items-center gap-2" },
  filterInput: { className: "h-9 w-full rounded-lg border px-2 outline-none" },
  token: { className: "m-1 rounded-lg bg-sze-secondary/10 text-sze-secondary px-2 py-1" },
  clearIcon: { className: "absolute right-10 top-1/2 -translate-y-1/2 text-black/50" },
  emptyMessage: { className: "px-3 py-2 text-black/60" },
};
