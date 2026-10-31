/**
 * A szülőoldal és az iframe-előnézet (preview.html) közötti üzenetek.
 *
 *   iframe -> szülő:  { channel, type: "ready" }
 *                     { channel, type: "height", value: <px> }
 *                     { channel, type: "status", ok: true | false, message? }
 *   szülő -> iframe:  { channel, type: "render", code }
 *
 * Mindkét oldal ellenőrzi az üzenet forrását (event.source) és eredetét
 * (event.origin), így más ablakok üzeneteit figyelmen kívül hagyja.
 */
export const CHANNEL = "sze-live-preview";

export const PREVIEW_URL = `${import.meta.env.BASE_URL}preview.html`;

/**
 * Az előnézet választható szélességei. Literál Tailwind-osztályok
 * kikeresőtáblában: összefűzött osztálynevet a Tailwind build közben nem találna meg.
 *
 * Egymás mellett (szerkesztő | előnézet) a fél kártyaszélesség kb. 500 px, ami
 * tabletnek és asztalinak kevés - ott az md:/lg: töréspontok nem is
 * érvényesülnének. Ezért a Tablet és az Asztali nézet egymás alá rendezi a
 * panelt, és az előnézet a teljes kártyaszélességet kapja (asztali képernyőn
 * >= 1024 px). Az alapértelmezett "Kitöltés" az osztott nézet saját panelje.
 */
export const VIEWPORTS = [
  { value: "fill", label: "Kitöltés", className: "w-full", stacked: false },
  { value: "mobile", label: "Mobil", className: "w-[375px]", stacked: false },
  { value: "tablet", label: "Tablet", className: "w-[768px]", stacked: true },
  { value: "desktop", label: "Asztali", className: "w-full", stacked: true },
];

/** Üzenet az iframe-ből a szülőoldalnak (csak azonos eredetre). */
export function postToParent(message) {
  window.parent.postMessage({ channel: CHANNEL, ...message }, window.location.origin);
}
