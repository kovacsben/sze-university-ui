
import { classNames } from "primereact/utils";

export const calendarPT = {
  /* A teljes mező konténer */
  root: { className: "relative inline-flex w-auto " },

  /* A beviteli mező */
  input: {
    className:
      "w-full h-10 rounded-2xl border border-black/15 bg-white " +
      "pl-3 pr-10 placeholder:opacity-60 " +            // pr-10: hely a jobb oldali ikon/triggertnek
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary " +
      "focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-neutral-900",
  },

  /* A jobb oldali ikon/trigger (ha showIcon=true) */
  inputIcon: {
    className:
      "absolute right-2 top-1/2 -translate-y-1/2 " +    // jobb oldalon, középre igazítva
      "h-7 w-7 rounded-lg flex items-center justify-center " +
      "text-sze-primary hover:bg-sze-primary/10 cursor-pointer transition",
  },

  /* Az előugró panel (naptár) */
  panel: { className: "m-auto  rounded-2xl border bg-white p-auto shadow-xl z-50 w-2xs" },

  /* Fejléc (hónap/év + navigáció) */
  header: { className: "flex items-center justify-between mb-2" },
  title:  { className: "text-sze-primary font-semibold " },
  previousButton: {
    className:
      "rounded-xl h-8 w-8 flex items-center justify-center hover:bg-sze-primary/10 text-sze-primary",
  },
  nextButton: {
    className:
      "rounded-xl h-8 w-8 flex items-center justify-center hover:bg-sze-primary/10 text-sze-primary",
  },

  /* Hétfejlécek */
  weekHeader: { className: "grid grid-cols-7 gap-8 px-1 text-[11px] uppercase text-black/50 mb-1 justify-center" },
  weekday: { className: "text-center justify-around w-2xs" },

  /* Napok rácsa */
  dayView: { className: "grid grid-cols-7 gap-3 justify-center p-1" },

  /* Egy nap cella – állapotfüggő osztályok a context alapján */
  day: ({ context }) => ({
    className: classNames(
      "text-center rounded-lg py-2 select-none cursor-pointer",
      "transition",
      context.otherMonth && "text-black/30",
      context.today && "ring-1 ring-sze-secondary",
      context.focused && "outline outline-2 outline-sze-secondary/40",
      context.disabled && "opacity-40 pointer-events-none",
      // kiválasztások
      (context.selected || context.rangeStart || context.rangeEnd) &&
        "bg-sze-primary text-white hover:bg-sze-primary",
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
  footer: { className: "mt-2 pt-2 border-t border-black/10 flex items-center justify-between gap-2" },
  todayButton: {
    className:
      "h-9 px-3 rounded-xl bg-sze-secondary text-white text-sm hover:opacity-90",
  },
  clearButton: {
    className:
      "h-9 px-3 rounded-xl border border-sze-primary text-sze-primary text-sm hover:bg-sze-primary/10",
  },

  /* (opcionális) időválasztó, ha showTime/showSeconds */
  timePicker: { className: "mt-2 flex items-center gap-2" },
  hour:   { className: "h-10 w-14 rounded-xl border px-2 text-center" },
  minute: { className: "h-10 w-14 rounded-xl border px-2 text-center" },
  second: { className: "h-10 w-14 rounded-xl border px-2 text-center" },
};
