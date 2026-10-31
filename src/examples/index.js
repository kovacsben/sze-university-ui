/**
 * A bemutató fülei a sorrendjükben.
 *
 * A `load` dinamikus import: minden fül (a példáival és a csak ott használt
 * függőségekkel, pl. a Quill az Editor példához) külön chunkba kerül, és csak
 * az első megnyitáskor töltődik le.
 */
export const TABS = [
  { id: "buttons", label: "Gombok", icon: "pi pi-check-square", load: () => import("./buttons") },
  { id: "inputs", label: "Input Mezők", icon: "pi pi-pencil", load: () => import("./inputs") },
  { id: "selection", label: "Kiválasztás", icon: "pi pi-list", load: () => import("./selection") },
  { id: "datetime", label: "Dátum & Idő", icon: "pi pi-calendar", load: () => import("./datetime") },
  { id: "advanced", label: "Haladó", icon: "pi pi-sliders-v", load: () => import("./advanced") },
  { id: "layout", label: "Layout & Forma", icon: "pi pi-window-maximize", load: () => import("./layout") },
];
