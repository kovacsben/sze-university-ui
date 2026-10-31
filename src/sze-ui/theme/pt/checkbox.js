import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";

export const checkboxPT = {
  root: { className: "inline-flex items-center gap-2 cursor-pointer select-none" },
  box: ({ context }) => ({
    className: classNames(
      `w-5 h-5 ${RADIUS.md} border flex items-center justify-center transition`,
      context.checked ? "bg-sze-primary border-sze-primary text-white" : "bg-white border-black/25",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary"
    ),
  }),
  icon: { className: "text-current text-sm" },
  // A natív inputot az index.css rejti el (sr-only), hogy fókuszálható maradjon.
};
