import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";

export const inputSwitchPT = {
  root: ({ props }) => ({
    className: classNames(
      "inline-flex items-center cursor-pointer select-none",
      props.disabled && "opacity-50 pointer-events-none"
    ),
  }),

  // props.checked-et használunk (context helyett), hogy biztos legyen
  slider: ({ props, context }) => ({
    className: classNames(
      `relative w-12 h-7 ${RADIUS.full} transition-colors`,
      (props.checked ?? context?.checked) ? "bg-sze-primary" : "bg-black/20"
    ),
  }),

  handle: ({ props, context }) => ({
    className: classNames(
      `absolute top-1/2 -translate-y-1/2 w-5 h-5 ${RADIUS.full} bg-white shadow transition-all`,
      (props.checked ?? context?.checked) ? "left-7" : "left-1"
    ),
  }),

  input: { className: "hidden" },
};
