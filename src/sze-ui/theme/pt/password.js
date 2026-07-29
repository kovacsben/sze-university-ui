import { RADIUS, SHADOW, FONT_SIZE, controlSize } from "../tokens";

export const passwordPT = {
  root: { className: "relative inline-block w-72" },

  input: ({ props }) => {
    const cs = controlSize(props.size);
    return {
      className:
        `w-full ${cs.height} ${RADIUS["2xl"]} border border-black/15 px-3 outline-none ${FONT_SIZE.sm} ` +
        "focus-visible:ring-1",
    };
  },

  panel: { className: `mt-2 ${RADIUS.xl} border bg-white p-3 ${SHADOW.lg} text-sm` },

  // Állapotfüggetlen méter – a szélességet/állapotot a PR kezeli
  meter: { className: `h-2 ${RADIUS.full} bg-black/10 overflow-hidden` },
  meterLabel: { className: "block h-full bg-sze-primary transition-all" },

  // szem ikon helye (ha használsz mask toggle-t)
  toggleMask: { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sze-primary" },
};
