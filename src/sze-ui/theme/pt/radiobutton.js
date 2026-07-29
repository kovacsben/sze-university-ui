import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";

export const radioButtonPT = {
  root: ({ props }) => ({
    className: classNames(
      "inline-flex items-center gap-2 cursor-pointer select-none",
      props.disabled && "opacity-50 pointer-events-none"
    ),
  }),

  // fontos: props.checked ?? context?.checked
  box: ({ props, context }) => {
    const isChecked = props.checked ?? context?.checked;
    return {
      className: classNames(
        `w-5 h-5 ${RADIUS.full} border flex items-center justify-center transition`,
        isChecked ? "border-sze-primary" : "border-black/25"
      ),
    };
  },

  icon: ({ props, context }) => {
    const isChecked = props.checked ?? context?.checked;
    return {
      className: classNames(
        `w-2.5 h-2.5 ${RADIUS.full}`,
        isChecked ? "bg-sze-primary" : "bg-transparent"
      ),
    };
  },

  input: { className: "hidden" },
};
