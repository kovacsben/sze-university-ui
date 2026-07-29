import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION, BORDER_WIDTH, controlSize } from "../tokens";

function variantClasses(props, { left = false, right = false } = {}) {
  // közös alap
  const base = [
    `inline-flex items-center justify-center font-semibold transition-all ${DURATION.normal}`,
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sze-secondary",
    "disabled:opacity-60 disabled:pointer-events-none",
  ];

  // lekerekítés: bal / jobb gomb (kisebb, modernebb)
  // ⚠️ a globális Button PT (pt/button.js) minden <Button>-re rounded-3xl-t tesz a
  // root classNameba; mivel az mergeProps-szal csak HOZZÁfűződik (nem felülírja),
  // a mi rész-lekerekítésünket "!"-fontossággal kell kikényszeríteni, különben
  // a rounded-3xl nyeri a Tailwind-ütközést és mindkét gomb teljesen kerek lesz.
  const radius = left
    ? `!rounded-l-lg !rounded-r-none`
    : right
    ? `!rounded-r-lg !rounded-l-none`
    : RADIUS.lg;

  // méret - a közös CONTROL_SIZE tokenből (megegyezik a Button skálájával)
  const cs = controlSize(props.size);
  const size = `${cs.height} ${cs.padding} ${cs.text}`;

  // variánsok (text / outlined / filled) + severity
  let variant = "";
  if (props.text) {
    variant = classNames(
      props.severity === "secondary"
        ? "text-sze-secondary hover:bg-sze-secondary/15"
        : props.severity === "success"
        ? "text-success hover:bg-success/15"
        : props.severity === "warning"
        ? "text-warning hover:bg-warning/15"
        : props.severity === "danger"
        ? "text-danger hover:bg-danger/15"
        : "text-sze-primary hover:bg-sze-primary/15"
    );
  } else if (props.outlined) {
    variant = classNames(
      props.severity === "secondary"
        ? `${BORDER_WIDTH.thick} border-sze-secondary text-sze-secondary hover:bg-sze-secondary/10`
        : props.severity === "success"
        ? `${BORDER_WIDTH.thick} border-success text-success hover:bg-success/10`
        : props.severity === "warning"
        ? `${BORDER_WIDTH.thick} border-warning text-warning hover:bg-warning/10`
        : props.severity === "danger"
        ? `${BORDER_WIDTH.thick} border-danger text-danger hover:bg-danger/10`
        : `${BORDER_WIDTH.thick} border-sze-primary text-sze-primary hover:bg-sze-primary/10`
    );
  } else {
    // filled (default) - moderna stílus, jó hover effect
    variant = classNames(
      props.severity === "secondary"
        ? "bg-sze-secondary text-white hover:bg-sze-secondary/90 active:scale-95"
        : props.severity === "success"
        ? "bg-success text-white hover:bg-success/90 active:scale-95"
        : props.severity === "warning"
        ? "bg-warning text-black hover:bg-warning/90 active:scale-95"
        : props.severity === "danger"
        ? "bg-danger text-white hover:bg-danger/90 active:scale-95"
        : "bg-sze-primary text-white hover:bg-sze-primary/90 active:scale-95"
    );
  }

  return classNames(...base, radius, size, variant);
}

export const splitButtonPT = {
  // a két gombot tartó keret
  root: { className: "inline-flex relative" },

  // bal oldali főgomb (label)
  button: ({ props }) => ({
    className: classNames(variantClasses(props, { left: true }), "gap-2 pr-2"),
  }),

  // jobb oldali trigger (▼) — fix szélesség, szorosabb szeparáció
  menuButton: ({ props }) => ({
    className: classNames( 
      variantClasses(props, { right: true }),
      "w-9 flex px-0 pl-2 border-l-2 border-current border-opacity-20"
    ),
  }),

  // a triggerben lévő ikon (kisebb, modernebb)
  menuButtonIcon: ({ props }) => ({
    className: "pi pi-chevron-up text-current text-xs"
  }),

  // overlay panel (jobbra igazítva, modern stílus)
  // ⚠️ ez az objektum a belső <TieredMenu> teljes `pt` propjaként landol
  // (splitbutton.esm.js: pt: ptm('menu')), tehát a TieredMenu saját PT
  // kulcsstruktúráját kell követnie (root / menu / menuitem / separator),
  // nem lapos { className } - különben egyik osztály sem érvényesül,
  // és a legördülő menünek nem lesz háttere.
  menu: {
    root: {
      className: `${RADIUS.lg} ${SHADOW.lg} border border-gray-200 bg-white overflow-hidden`,
    },
    menu: { className: "focus:outline-none" },

    // menüelemek (modern, szorosabb)
    menuitem: ({ context }) => ({
      className: classNames(
        "px-3 py-2 text-sm cursor-pointer transition-colors text-gray-800 hover:bg-gray-100",
        context.active && "bg-sze-primary/20 text-sze-primary font-semibold"
      ),
    }),

    // (opcionális) elválasztó
    separator: { className: "h-px bg-black/30" },
  },
};
