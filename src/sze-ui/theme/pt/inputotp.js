import { classNames } from "primereact/utils";

export const inputOtpPT = {
  root: { className: "flex gap-2" },
  input: ({ context }) => ({
    className: classNames(
      "w-10 h-12 text-center rounded-xl border border-black/15 bg-white",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
      context.filled && "border-sze-secondary",
      context.disabled && "opacity-50 pointer-events-none"
    ),
  }),
};
