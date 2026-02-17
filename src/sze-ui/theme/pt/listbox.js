import { classNames } from "primereact/utils";
export const listboxPT = {
  root: { className: "w-64 rounded-2xl border border-black/15 bg-white" },
  header: { className: "p-2 border-b border-black/10" },
  filter: { className: "w-full h-9 rounded-xl border px-3 outline-none" },
  list: { className: "max-h-60 overflow-auto p-1" },
  item: ({ context }) => ({
    className: classNames(
      "px-3 py-2 rounded-lg cursor-pointer",
      context.focused && "bg-sze-primary/10",
      context.selected && "bg-sze-primary/20 text-sze-primary"
    ),
  }),
  emptyMessage: { className: "p-3 text-black/60" },
};
