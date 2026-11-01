import React from "react";
import { RADIUS, SHADOW } from "../theme/tokens";

/**
 * A saját menükomponensek (Megamenu, Menubar, TieredMenu) közös építőkövei.
 * Nem része a publikus API-nak: csak azért van, hogy a három menü ugyanazokból
 * az alapkomponensekből és ugyanazokkal a felületekkel épüljön.
 *
 * - minden kattintható menüpont a SZE Button `text` variánsa,
 * - az elválasztó a SZE Divider,
 * - a lenyíló panelek a Dropdown paneljével egyeznek (keret, árnyék, lekerekítés),
 * - a menüsorok (Megamenu, Menubar) ugyanazt a sávot kapják.
 *
 * Akadálymentesség: "disclosure" minta - a nyitógombok `aria-expanded`-et
 * kapnak, a listák sima <ul>-ok. A `role="menu"` szándékosan nincs rajtuk,
 * mert az nyilas billentyűzetes bejárást ígérne a képernyőolvasónak.
 */

/* A konstansok és a segédfüggvények itt, a komponensek a MenuParts.jsx-ben
   (a Vite Fast Refresh csak komponenst exportáló .jsx fájlokat frissít helyben). */

/** Vízszintes menüsáv (Megamenu, Menubar). */
export const MENU_BAR = `flex items-center gap-1 ${RADIUS["2xl"]} border border-black/10 bg-white p-1.5 ${SHADOW.sm}`;

/** Lenyíló panel - a Dropdown panelével azonos felület. */
export const MENU_PANEL = `z-50 ${RADIUS.xl} border border-gray-100 bg-white p-1.5 ${SHADOW["2xl"]}`;

/** Oszlop- vagy csoportcím a paneleken (a TimePicker mezőcímkéivel egyező stílus). */
export const MENU_HEADING = "px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-500";

/**
 * Egy menüpont meghívása. A `command` a PrimeReact MenuItem-mel egyező
 * `{ originalEvent, item }` objektumot kapja, így ugyanaz a model mindkét
 * világban használható.
 */
export function runItem(item, event, onItemClick) {
  item.command?.({ originalEvent: event, item });
  onItemClick?.(item);
}

/**
 * Nyitott állapotban kívülre kattintásra vagy Esc-re bezár.
 * Esc-nél a fókusz a nyitott menü gombjára kerül vissza (aria-expanded="true").
 */
export function useDismiss(rootRef, active, onDismiss) {
  const callback = React.useRef(onDismiss);
  callback.current = onDismiss;

  React.useEffect(() => {
    if (!active) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) callback.current();
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      const trigger = rootRef.current?.querySelector('[aria-expanded="true"]');
      callback.current();
      trigger?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [rootRef, active]);
}
