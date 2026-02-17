import { classNames } from "primereact/utils";
export const mentionPT = {
  root: { className: "relative inline-block w-full" },
  input: { className: "w-full min-h-24 rounded-2xl border border-black/15 bg-white px-3 py-2 outline-none" },
  panel: { className: "absolute z-50 mt-1 rounded-xl border bg-white p-1 shadow-lg w-64" },
  item: ({ context }) => ({
    className: classNames("px-3 py-2 rounded-lg cursor-pointer",
      context.focused && "bg-sze-primary/10"),
  }),
  emptyMessage: { className: "px-3 py-2 text-black/60" },
};
