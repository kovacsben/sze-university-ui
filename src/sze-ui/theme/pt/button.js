import { classNames } from "primereact/utils";


export const buttonPT = {
  root: ({ props }) => {
    const base = [
      "inline-flex items-center justify-center gap-2 rounded-3xl font-medium transition",
      "focus-visible: outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
      "focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-neutral-900",
      "disabled:opacity-60 disabled:pointer-events-none",
      "active:translate-y-px"
    ];

    const sizeCls =
      props.size === "small" ? "h-9 px-3 text-sm"
    : props.size === "large" ? "h-11 px-5 text-base"
    : "h-10 px-4 text-sm"; // normal

    let variantCls = "";

    if (props.link) {
      variantCls = "bg-transparent underline underline-offset-4 text-sze-primary hover:no-underline";
    } else if (props.text) {
      variantCls = classNames(
        props.severity === "secondary" ? "text-sze-secondary hover:bg-sze-secondary/10"
      : props.severity === "success"   ? "text-success hover:bg-success/10"
      : props.severity === "warning"   ? "text-warning hover:bg-warning/10"
      : props.severity === "danger"    ? "text-danger hover:bg-danger/10"
                                       : "text-sze-primary hover:bg-sze-primary/10"
      );
    } else if (props.outlined) {
      variantCls = classNames(
        props.severity === "secondary" ? "border border-sze-secondary text-sze-secondary hover:bg-sze-secondary/10"
      : props.severity === "success"   ? "border border-success text-success hover:bg-success/10"
      : props.severity === "warning"   ? "border border-warning text-warning hover:bg-warning/80"
      : props.severity === "danger"    ? "border border-danger text-danger hover:bg-danger/10"
                                       : "border border-sze-primary text-sze-primary hover:bg-sze-primary/10"
      );
    } else {
      variantCls = classNames(
        props.severity === "secondary" ? "bg-sze-secondary text-white hover:opacity-90"
      : props.severity === "success"   ? "bg-success text-white hover:opacity-90"
      : props.severity === "warning"   ? "bg-warning text-black hover:opacity-90"
      : props.severity === "danger"    ? "bg-danger text-white hover:opacity-90"
                                       : "bg-sze-primary text-white hover:opacity-90"
      );
    }

    return { className: classNames(...base, sizeCls, variantCls) };
  },
  label: { className: "truncate" },
  icon: ({ props }) => ({ className: classNames(props.iconPos === "right" ? "order-2 ml-2" : "mr-2") }),
  loadingIcon: { className: "animate-spin" },
};
