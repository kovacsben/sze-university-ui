import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, controlSize } from "../tokens";

export const multiSelectPT = {
  root: ({ props }) => {
    const cs = controlSize(props.size);
    return {
      className: `relative inline-flex w-full ${cs.height} items-center ${RADIUS["2xl"]} border border-black/15 bg-white pl-3 pr-10 cursor-pointer`,
    };
  },
  label: { className: "truncate" },
  trigger: { className: `absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 ${RADIUS.lg} flex items-center justify-center hover:bg-sze-primary/10` },

  panel: { className: `mt-1 ${RADIUS.xl} border border-black/15 bg-white p-2 ${SHADOW.lg}` },
  header: { className: "px-1 pb-2 mb-1 border-b border-black/10 flex items-center justify-between gap-2" },
  headerCheckboxContainer: { className: "flex items-center gap-2" },
  headerSelectAllLabel: { className: "text-sm text-black/70 cursor-pointer" },
  closeButton: { className: `h-7 w-7 ${RADIUS.lg} flex items-center justify-center text-black/50 hover:bg-sze-primary/10` },
  filterContainer: { className: "flex-1" },
  filterInput: { className: `h-9 w-full ${RADIUS.lg} border border-black/15 px-2 outline-none` },

  // a lista görgethető legyen (a max-height-ot a PrimeReact inline adja)
  wrapper: { className: "overflow-auto" },
  list: { className: "list-none m-0 p-0" },

  // az elem címkéje a jelölőnégyzet mellé kerüljön, ne alá
  item: ({ context }) => ({
    className: classNames(
      `flex items-center gap-2 px-3 py-2 ${RADIUS.lg} cursor-pointer`,
      context.selected && "bg-sze-primary/20 text-sze-primary",
      context.focused && "bg-sze-primary/10"
    ),
  }),

  token: { className: `m-1 ${RADIUS.lg} bg-sze-secondary/10 text-sze-secondary px-2 py-1` },
  clearIcon: { className: "absolute right-10 top-1/2 -translate-y-1/2 text-black/50" },
  emptyMessage: { className: "px-3 py-2 text-black/60" },
};
