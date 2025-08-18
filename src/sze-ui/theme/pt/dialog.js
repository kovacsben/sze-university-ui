export const dialogPT = {
  // Teljes képernyős maszk: halvány sötétítés + enyhe háttérelmosás
  mask: {
    className:
      "fixed inset-0 flex items-center justify-center p-4 " +
      "bg-black/40 backdrop-blur-sm", // <- csak a HÁTTÉR sötétül és mosódik
  },

  // A tényleges „doboz” – tiszta fehér, árnyékkal és finom kerettel
  content: {
    className:
      "rounded-2xl bg-white text-black shadow-xl ring-1 ring-black/10",
  },

  header: { className: "px-6 py-4 border-b border-black/10" },
  title:  { className: "text-lg font-semibold text-sze-primary" },
  closeButton: { className: "rounded-full p-2 hover:bg-sze-primary/10" },
  footer: { className: "px-6 py-4 border-t border-black/10" },
};
