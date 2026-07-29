import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, controlSize } from "../tokens";
export const multiSelectPT = {
  root: ({ props }) => {
    const cs = controlSize(props.size);
    return {
      className: `relative inline-flex w-72 ${cs.height} items-center ${RADIUS["2xl"]} border border-black/15 bg-white pl-3 pr-10`,
    };
  },
  label: { className: "truncate" },
  trigger: { className: `absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 ${RADIUS.lg} flex items-center justify-center hover:bg-sze-primary/10` },
  panel: { className: `mt-1 ${RADIUS.xl} border bg-white p-2 ${SHADOW.lg} w-72` },
  item: ({ context }) => ({
    className: classNames(
      `px-3 py-2 ${RADIUS.lg} cursor-pointer`,
      context.selected && "bg-sze-primary/20 text-sze-primary",
      context.focused && "bg-sze-primary/10"
    ),
  }),
  header: { className: "p-2 border-b border-black/10 flex items-center gap-2" },
  filterInput: { className: `h-9 w-full ${RADIUS.lg} border px-2 outline-none` },
  token: { className: `m-1 ${RADIUS.lg} bg-sze-secondary/10 text-sze-secondary px-2 py-1` },
  clearIcon: { className: "absolute right-10 top-1/2 -translate-y-1/2 text-black/50" },
  emptyMessage: { className: "px-3 py-2 text-black/60" },
};
