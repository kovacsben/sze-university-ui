import { classNames } from "primereact/utils";
export const multiStateCheckboxPT = {
  root: { className: "inline-flex items-center" },
  box: ({ context }) => ({
    className: classNames(
      "w-5 h-5 rounded-md border flex items-center justify-center transition",
      context.value ? "bg-sze-primary border-sze-primary text-white" : "bg-white border-black/25"
    ),
  }),
  icon: { className: "text-current text-sm" },
};
