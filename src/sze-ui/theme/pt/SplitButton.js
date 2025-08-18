import { classNames } from "primereact/utils";

function variantClasses(props, { left = false, right = false } = {}) {
  // közös alap
  const base = [
    "inline-flex items-center justify-center font-medium transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
    "focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-neutral-900",
    "disabled:opacity-60 disabled:pointer-events-none",
  ];

  // lekerekítés: bal / jobb gomb
  const radius = left
    ? "rounded-r-2xl rounded-r-none"
    : right
    ? "rounded-r-2xl rounded-l-none"
    : "rounded-2xl";

  // méret
  const size =
    props.size === "small"
      ? "h-9 px-4 text-sm"
      : props.size === "large"
      ? "h-11 px-5 text-base"
      : "h-10 px-5 text-sm";

  // variánsok (text / outlined / filled) + severity
  let variant = "";
  if (props.text) {
    variant = classNames(
      props.severity === "secondary"
        ? "text-sze-secondary hover:bg-sze-secondary/10"
        : props.severity === "success"
        ? "text-success hover:bg-success/10"
        : props.severity === "warning"
        ? "text-warning hover:bg-warning/10"
        : props.severity === "danger"
        ? "text-danger hover:bg-danger/10"
        : "text-sze-primary hover:bg-sze-primary/10"
    );
  } else if (props.outlined) {
    variant = classNames(
      props.severity === "secondary"
        ? "border border-sze-secondary text-sze-secondary hover:bg-sze-secondary/10"
        : props.severity === "success"
        ? "border border-success text-success hover:bg-success/10"
        : props.severity === "warning"
        ? "border border-warning text-warning hover:bg-warning/10"
        : props.severity === "danger"
        ? "border border-danger text-danger hover:bg-danger/10"
        : "border border-sze-primary text-sze-primary hover:bg-sze-primary/10"
    );
  } else {
    // filled (default)
    variant = classNames(
      props.severity === "secondary"
        ? "bg-sze-secondary text-white hover:opacity-90"
        : props.severity === "success"
        ? "bg-success text-white hover:opacity-90"
        : props.severity === "warning"
        ? "bg-warning text-black hover:opacity-90"
        : props.severity === "danger"
        ? "bg-danger text-white hover:opacity-90"
        : "bg-sze-primary text-white hover:opacity-90"
    );
  }

  return classNames(...base, radius, size, variant);
}

export const splitButtonPT = {
  // a két gombot tartó keret
  root: { className: "inline-flex relative" },

  // bal oldali főgomb (label)
  button: ({ props }) => ({
    className: classNames(variantClasses(props, { left: true }), "gap-2"),
  }),

  // jobb oldali trigger (▼) — fix szélesség, hogy szép legyen
  menuButton: ({ props }) => ({
    className: classNames(
      variantClasses(props, { right: true }),
      "w-10 px-0 border-l border-white/20"
    ),
  }),

  // a triggerben lévő ikon
  menuButtonIcon: { className: "pi pi-chevron-down text-current" },

  // overlay panel (jobbra igazítva)
  menu: { className: "absolute z-50 mt-1 right-0 rounded-xl border bg-white p-1 shadow-lg" },

  // menüelemek
  menuitem: ({ context }) => ({
    className: classNames(
      "px-3 py-2 rounded-lg cursor-pointer text-sze-primary",
      context.focused && "bg-sze-primary/10",
      context.active && "bg-sze-primary/20"
    ),
  }),

  // (opcionális) elválasztó
  separator: { className: "my-1 h-px bg-black/10" },
};
