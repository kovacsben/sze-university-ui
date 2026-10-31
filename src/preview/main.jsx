import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import "quill/dist/quill.snow.css";
import "primeicons/primeicons.css";
import indexCssSource from "../index.css?raw";
import { SzeProvider } from "../sze-ui";
import { postToParent } from "../components/live/previewProtocol";
import PreviewApp from "./PreviewApp";

/**
 * Az élő előnézet iframe-alkalmazása (preview.html).
 *
 * Miért külön dokumentum: a szerkesztőben új Tailwind-osztályok is
 * születhetnek, amelyekhez a build-CSS-ben nincs szabály. Ezeket a
 * @tailwindcss/browser futásidőben generálja, de ez a teljes DOM-ot figyeli és
 * saját stíluslapot injektál - a főoldalon a bemutató és a könyvtár kaszkádját
 * is befolyásolná. Az iframe-ben izolált, a PrimeReact overlayek (Dialog,
 * Dropdown, Toast) a saját document-jükben maradnak, a mobil/tablet szélesség
 * pedig valódi viewport-szélesség (az md:/lg: töréspontok is reagálnak).
 *
 * A CSS két rétegből áll:
 * 1. a lefordított index.css (ugyanaz, mint a főoldalon): tokenek, base/
 *    components réteg és a rétegen kívüli javítások (InputGroup, FloatLabel,
 *    natív inputok elrejtése...);
 * 2. a böngészős Tailwind csak a theme + utilities részt generálja (preflight
 *    nélkül, hogy ne duplikálódjon), az index.css @theme blokkjával - így az SZE
 *    tokenek (pl. bg-sze-primary-700) egyetlen forrásból jönnek.
 */

/** Kivágja az `@theme { ... }` blokkot a CSS-forrásból (zárójelszámlálással). */
function extractThemeBlock(css) {
  const start = css.search(/@theme\s*\{/);
  if (start < 0) return "";
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) return css.slice(start, i + 1);
  }
  return "";
}

async function startBrowserTailwind() {
  const style = document.createElement("style");
  style.type = "text/tailwindcss";
  style.textContent = [
    "@layer theme, base, components, utilities;",
    '@import "tailwindcss/theme" layer(theme);',
    '@import "tailwindcss/utilities" layer(utilities);',
    extractThemeBlock(indexCssSource),
  ].join("\n");
  document.head.appendChild(style);
  // A csomag betöltéskor azonnal elindul: beolvassa a text/tailwindcss
  // stíluslapot, és MutationObserverrel követi a DOM osztályait.
  await import("@tailwindcss/browser");
}

/**
 * A tartalom magassága a szülő iframe-jének méretezéséhez. A #root saját
 * magasságát mérjük (nem a scrollHeight-et, ami sosem lehet kisebb a
 * viewportnál, így az iframe nem tudna zsugorodni), plusz a body-ba portálozott
 * overlayek (pl. Dropdown panel) alsó szélét.
 */
function measureHeight(root) {
  let height = root.offsetHeight;
  for (const el of document.body.children) {
    if (el === root || el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;
    const rect = el.getBoundingClientRect();
    if (rect.height > 0 && getComputedStyle(el).position !== "fixed") {
      height = Math.max(height, rect.bottom + window.scrollY);
    }
  }
  return Math.ceil(height);
}

function reportHeight(root) {
  let frame = 0;
  let last = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const h = measureHeight(root);
      if (h !== last) {
        last = h;
        postToParent({ type: "height", value: h });
      }
    });
  };
  new ResizeObserver(schedule).observe(root);
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true });
  schedule();
}

const rootEl = document.getElementById("root");
rootEl.className = "p-4";
startBrowserTailwind();
reportHeight(rootEl);

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <SzeProvider>
      <PreviewApp />
    </SzeProvider>
  </React.StrictMode>
);
