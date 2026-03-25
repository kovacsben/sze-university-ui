
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
  panel: { className: "bg-white border rounded-2xl m-2 p-4 shadow-xl z-50 w-auto" },

  /* Fejléc (hónap/év + navigáció) */
  header: { className: "flex items-center justify-center mb-2" },
  title:  { className: "text-sze-primary font-semibold" },
  previousButton: {
    className:
      "rounded-2xl h-8 w-8 flex items-center justify-center hover:bg-sze-primary/10 text-sze-primary",
  },
  nextButton: {
    className:
      "rounded-2xl h-8 w-8 flex items-center justify-center hover:bg-sze-primary/10 text-sze-primary",
  },

  /* Hétfejlécek */
  weekHeader: { className: "items-center justify-center" },
  weekday: { className: "items-center justify-center" },

  /* Napok rácsa */
  dayView: { className: "items-center justify-center" },

  /* Egy nap cella – állapotfüggő osztályok a context alapján */
  day: ({ context }) => ({
    className: classNames(
      "text-center rounded-xl p-2 m-1 select-none cursor-pointer text-sm ",
      "transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:rounded-xl hover:text-bold",
      context.otherMonth && "text-black/30",
      context.today && "ring-1 ring-sze-primary rounded-2xl",
      context.focused && "outline outline-2 outline-sze-primary/40 rounded-2xl",
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

  /* (opcionális) időválasztó, ha showTime/showSeconds */
  timePicker: { className: "mt-2 pt-2 border-t border-black/10 flex justify-center items-center gap-4" },
  
  /* Óra, perc, másodperc input mezők */
  timePickerContainer: { className: "flex items-center justify-center gap-2" },
  hour:   { 
    className: "w-12 h-10 rounded-lg border border-black/15 bg-white text-center font-semibold text-sze-primary focus:outline-none focus:ring-2 focus:ring-sze-primary"
  },
  minute: { 
    className: "w-12 h-10 rounded-lg border border-black/15 bg-white text-center font-semibold text-sze-primary focus:outline-none focus:ring-2 focus:ring-sze-primary"
  },
  second: { 
    className: "w-12 h-10 rounded-lg border border-black/15 bg-white text-center font-semibold text-sze-primary focus:outline-none focus:ring-2 focus:ring-sze-primary"
  },
  
  /* Szeparátor (: jelek az idő között) */
  timePickerSeparator: { className: "text-sze-primary font-bold" },
  
  /* Az időválasztó gombok (+/-) */
  timePickerButton: { 
    className: "rounded-lg h-8 w-8 flex items-center justify-center text-sze-primary hover:bg-sze-primary/10 border border-black/10 hover:border-sze-primary/30 transition cursor-pointer"
  },
};
