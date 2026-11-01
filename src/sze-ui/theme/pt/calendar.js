
import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, DURATION, controlSize } from "../tokens";
import { BUTTON_BASE, buttonVariantClasses } from "./button";

/* Az időválasztó közös osztályai (lásd lent, timePicker) */
const TIME_COLUMN = "flex flex-col items-center gap-1";
const TIME_STEP_BUTTON = classNames(...BUTTON_BASE, RADIUS.full, "h-9 w-9", buttonVariantClasses({ text: true }));
const TIME_VALUE =
  `flex h-10 w-14 items-center justify-center ${RADIUS.xl} border border-black/15 bg-sze-third/20 ` +
  "text-lg font-semibold text-sze-primary tabular-nums select-none";

export const calendarPT = {
  /* A teljes mező konténer */
  root: { className: "relative inline-flex w-auto " },

  /* A beviteli mező */
  input: ({ props }) => {
    const cs = controlSize(props.size);
    return {
      className:
        `w-full ${cs.height} ${RADIUS["2xl"]} border border-black/15 bg-white ` +
        "pl-3 pr-10 placeholder:opacity-60 " +            // pr-10: hely a jobb oldali ikon/triggertnek
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary " +
        "focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-neutral-900",
    };
  },

  /* A jobb oldali ikon/trigger (ha showIcon=true) */
  inputIcon: {
    className:
      "absolute right-2 top-1/2 -translate-y-1/2 " +    // jobb oldalon, középre igazítva
      `h-7 w-7 ${RADIUS.lg} flex items-center justify-center ` +
      "text-sze-primary hover:bg-sze-primary/10 cursor-pointer transition",
  },

  /* Az előugró panel (naptár) */
  // A keret színe nélkül a border currentColor (fekete) lenne; a Dropdown panelével egyezik.
  panel: { className: `bg-white border border-gray-100 ${RADIUS["2xl"]} m-2 p-4 ${SHADOW["2xl"]} z-50 w-auto` },

  /* Fejléc (hónap/év + navigáció) */
  header: { className: "flex items-center justify-center mb-2" },
  title:  { className: "flex items-center gap-1 text-sze-primary font-semibold" },
  /* A hónap és az év két külön gomb; térköz nélkül "November2026" lett belőlük. */
  monthTitle: { className: `px-1.5 ${RADIUS.lg} hover:bg-sze-primary/10 transition-colors` },
  yearTitle:  { className: `px-1.5 ${RADIUS.lg} hover:bg-sze-primary/10 transition-colors` },
  previousButton: {
    className:
      `${RADIUS["2xl"]} h-8 w-8 flex items-center justify-center hover:bg-sze-primary/10 text-sze-primary`,
  },
  nextButton: {
    className:
      `${RADIUS["2xl"]} h-8 w-8 flex items-center justify-center hover:bg-sze-primary/10 text-sze-primary`,
  },

  /* Hétfejlécek */
  weekHeader: { className: "items-center justify-center" },
  weekday: { className: "items-center justify-center" },

  /* Napok rácsa */
  dayView: { className: "items-center justify-center" },

  /* Egy nap cella – állapotfüggő osztályok a context alapján */
  day: ({ context }) => ({
    className: classNames(
      `text-center ${RADIUS.xl} p-2 m-1 select-none cursor-pointer text-sm `,
      `transition delay-100 ${DURATION.slow} ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:rounded-xl hover:text-bold`,
      context.otherMonth && "text-black/30",
      context.today && `ring-1 ring-sze-primary ${RADIUS["2xl"]}`,
      context.focused && `outline outline-2 outline-sze-primary/40 ${RADIUS["2xl"]}`,
      context.disabled && "opacity-40 pointer-events-none",
      // kiválasztások
      (context.selected || context.rangeStart || context.rangeEnd) &&
        "bg-sze-primary text-white hover:bg-sze-primary/10",
      context.rangeBetween && "bg-sze-primary/20 text-sze-primary",
      // alap hover
      !context.selected &&
        !context.rangeStart &&
        !context.rangeEnd &&
        !context.rangeBetween &&
        !context.disabled &&
        "hover:bg-sze-primary/10"
    ),
  }),

  /* Láb (Today/Clear) – ha showButtonBar=true */
  footer: { className: "p-2 m-2" },
  todayButton: {
    className:
      "p-2 m-2 bg-sze-secondary",
  },
  clearButton: {
    className:
      "p-2 m-2",
  },

  /*
   * Időválasztó (showTime / timeOnly)
   *
   * Szerkezet: timePicker > hourPicker | separatorContainer | minutePicker ...,
   * ahol egy *Picker = incrementButton + érték <span> + decrementButton.
   * Unstyled módban ezek egymás mellé, sorba kerülnének ("^19v"), ezért
   * itt oszlopba rendezzük őket.
   *
   * A kinézet a SZE TimePicker léptetőivel azonos: a nyilak a Button `text`
   * variánsát kapják (BUTTON_BASE + buttonVariantClasses, mint a
   * SelectButton), az értékdoboz pedig az InputText xl-es lekerekítésű,
   * h-10-es mezőjét követi.
   */
  timePicker: { className: "mt-3 pt-3 border-t border-black/10 flex items-center justify-center gap-2" },

  hourPicker:   { className: TIME_COLUMN },
  minutePicker: { className: TIME_COLUMN },
  secondPicker: { className: TIME_COLUMN },
  ampmPicker:   { className: TIME_COLUMN },

  incrementButton: { className: TIME_STEP_BUTTON },
  decrementButton: { className: TIME_STEP_BUTTON },
  incrementIcon: { className: "w-3.5 h-3.5" },
  decrementIcon: { className: "w-3.5 h-3.5" },

  hour:   { className: TIME_VALUE },
  minute: { className: TIME_VALUE },
  second: { className: TIME_VALUE },
  ampm:   { className: TIME_VALUE },

  /* A ":" elválasztó, az értékdobozok magasságában */
  separatorContainer: { className: "flex h-10 items-center" },
  separator: { className: "text-lg font-semibold text-sze-primary" },
};
