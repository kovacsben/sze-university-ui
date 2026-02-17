import { classNames } from "primereact/utils";
export const toggleButtonPT = {
  root: ({ props }) => ({
    className: classNames(
      "inline-flex items-center h-10 px-4 rounded-2xl border transition",
      props.checked ? "bg-sze-primary text-white border-sze-primary" : "bg-white border-black/15 hover:bg-sze-primary/10"
    ),
  }),
  label: { className: "text-sm font-medium" },
  icon: { className: "mr-2" },
};
