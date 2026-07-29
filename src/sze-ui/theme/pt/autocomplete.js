import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, controlSize } from "../tokens";

export const autoCompletePT = {
  root: { className: "w-72" },
  input: ({ props }) => {
    const cs = controlSize(props.size);
    return {
      className: `w-full ${cs.height} ${RADIUS["2xl"]} border border-black/15 px-3 placeholder:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-neutral-900`,
    };
  },
  panel: { className: `mt-1 ${RADIUS.xl} border bg-white p-1 ${SHADOW.lg}` },
  item: ({ context }) => ({
    className: classNames(
      `px-3 py-2 ${RADIUS.lg} cursor-pointer`,
      context.focused && "bg-sze-primary/10",
      context.selected && "bg-sze-primary/20"
    ),
  }),
  token: { className: "m-1 px-2 py-1 rounded bg-sze-secondary/10 text-sze-secondary" },
  removeTokenIcon: { className: "ml-1" },
};
