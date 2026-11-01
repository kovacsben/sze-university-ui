import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";

export const inputSwitchPT = {
  root: ({ props }) => ({
    className: classNames(
      "inline-flex items-center cursor-pointer select-none",
      props.disabled && "opacity-50 pointer-events-none"
    ),
  }),

  // props.checked-et használunk (context helyett), hogy biztos legyen.
  //
  // A kapcsológomb (knob) a slider ::before pszeudo-eleme: a PrimeReact 10
  // InputSwitch-nek nincs külön "handle" szekciója (a styled mód is ::before-ral
  // rajzolja), így a korábbi `handle` kulcs sosem érvényesült, és a kapcsoló
  // egy kerek gomb nélküli, egyszínű sáv volt.
  slider: ({ props, context }) => {
    const checked = props.checked ?? context?.checked;
    return {
      className: classNames(
        `relative block w-12 h-7 ${RADIUS.full} transition-colors duration-200`,
        checked ? "bg-sze-primary" : "bg-black/20",
        `before:absolute before:top-1 before:left-1 before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:content-['']`,
        "before:transition-transform before:duration-200",
        checked && "before:translate-x-5"
      ),
    };
  },

  input: { className: "hidden" },
};
