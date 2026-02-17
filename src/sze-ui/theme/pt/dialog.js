export const dialogPT = {
  // Teljes képernyős maszk: halvány sötétítés + enyhe háttérelmosás
  // Ez a réteg fedi le az egész képernyőt, középre igazítja a dialógust, sötétíti és elmosja a hátteret.
  mask: {
    className:
      "fixed inset-0 flex items-center justify-center p-4" +
      "bg-black/40 backdrop-blur-sm", // csak a háttér sötétül és mosódik
  },

  // A dialógus doboz: fehér háttér, árnyék, színes keret, lekerekített sarkok, maximális szélesség.
  content: {
    className:
      "bg-white text-black shadow-xl ring-1 ring-sze-primary ring-black/10 px-8 py-6 rounded-3xl w-full max-w-xl",
  },

  // Fejléc: vízszintesen rendezett elemek (X gomb balra, cím mellette), alsó szegéllyel.
  header: { 
    className: "flex flex-row items-center px-2 py-2 border-b border-black/10"
  },

  // Cím: balra behúzva, nagyobb betűméret, színes kiemelés.
  title:  { className: "ml-auto text-lg font-semibold text-sze-primary" },

  // Bezáró X gomb: bal oldalon, lekerekített, hover effekt.
  closeButton: { className: "order-1 rounded-full p-2 hover:bg-sze-primary/10" },

  // Lábléc: felső szegéllyel, függőleges padding.
  footer: { className: "py-2 border-t border-black/10" },
};
