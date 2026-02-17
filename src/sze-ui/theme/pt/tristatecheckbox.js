import { classNames } from "primereact/utils";
export const triStateCheckboxPT = {
  root: { className: "inline-flex items-center" },
  box: ({ context }) => ({
    className: classNames(
      "w-5 h-5 rounded-md border flex items-center justify-center transition",
      context.value === true  && "bg-sze-primary border-sze-primary text-white",
      context.value === false && "bg-white border-black/25",
      context.value == null   && "bg-warning/20 border-warning text-warning"
    ),
  }),
  icon: { className: "text-current text-sm" },
};
