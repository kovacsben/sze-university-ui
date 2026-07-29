import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, controlSize } from "../tokens";
export const treeSelectPT = {
  root: ({ props }) => {
    const cs = controlSize(props.size);
    return {
      className: `relative inline-flex w-72 ${cs.height} items-center ${RADIUS["2xl"]} border border-black/15 bg-white pl-3 pr-10`,
    };
  },
  label: { className: "truncate" },
  trigger: { className: `absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 ${RADIUS.lg} flex items-center justify-center hover:bg-sze-primary/10` },
  panel: { className: `mt-1 ${RADIUS.xl} border bg-white p-2 ${SHADOW.lg} w-72` },
  node: ({ context }) => ({
    className: classNames(
      `px-2 py-1 ${RADIUS.md} cursor-pointer flex items-center gap-2`,
      context.selected && "bg-sze-primary/20 text-sze-primary",
      context.focused && "bg-sze-primary/10"
    ),
  }),
  checkbox: { className: "w-4 h-4 rounded border border-black/25" },
};
