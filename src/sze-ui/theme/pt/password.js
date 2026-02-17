export const passwordPT = {
  root: { className: "relative inline-block w-72" },

  input: {
    className:
      "w-full h-10 rounded-2xl border border-black/15 px-3 outline-none " +
      "focus-visible:ring-2 focus-visible:ring-sze-secondary",
  },

  panel: { className: "mt-2 rounded-xl border bg-white p-3 shadow-lg" },

  // Állapotfüggetlen méter – a szélességet/állapotot a PR kezeli
  meter: { className: "h-2 rounded-full bg-black/10 overflow-hidden" },
  meterLabel: { className: "block h-full bg-sze-primary transition-all" },

  // szem ikon helye (ha használsz mask toggle-t)
  toggleMask: { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sze-primary" },
};
