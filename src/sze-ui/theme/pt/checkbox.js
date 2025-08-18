import { classNames } from "primereact/utils";

export const checkboxPT = {
  root: { className: "inline-flex items-center gap-2" },
  box: ({ context }) => ({
    className: classNames(
      "w-5 h-5 rounded-md border flex items-center justify-center transition",
      context.checked ? "bg-sze-primary border-sze-primary text-white" : "bg-white border-black/25",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary"
    ),
  }),
  icon: { className: "text-current text-sm" },
};
