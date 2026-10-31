import buttons from "./buttons";
import inputs from "./inputs";
import selection from "./selection";
import datetime from "./datetime";
import advanced from "./advanced";
import layout from "./layout";

/** A bemutató fülei a sorrendjükben, a hozzájuk tartozó példákkal. */
export const TABS = [
  { id: "buttons", label: "Gombok", icon: "pi pi-check-square", examples: buttons },
  { id: "inputs", label: "Input Mezők", icon: "pi pi-pencil", examples: inputs },
  { id: "selection", label: "Kiválasztás", icon: "pi pi-list", examples: selection },
  { id: "datetime", label: "Dátum & Idő", icon: "pi pi-calendar", examples: datetime },
  { id: "advanced", label: "Haladó", icon: "pi pi-sliders-v", examples: advanced },
  { id: "layout", label: "Layout & Forma", icon: "pi pi-window-maximize", examples: layout },
];
