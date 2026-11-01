import { classNames } from "primereact/utils";
import { RADIUS, SHADOW } from "../tokens";
import { BUTTON_BASE, buttonVariantClasses } from "./button";

/**
 * Dialog Pass-Through (PT) stílusok
 *
 * Szerkezet: mask > root > header (headerTitle + headerIcons > closeButton),
 * content, footer.
 *
 * Maga a doboz a `root`: ez kapja a hátteret, a lekerekítést és az árnyékot,
 * a fejléc, a tartalom és a lábléc csak belső térközt. Korábban a `content`
 * volt a doboz, a `root` pedig átlátszó maradt - így a cím és a gombok a
 * dobozon kívül lebegtek, a fejléc alsó és a lábléc felső szegélye pedig
 * szürke csíkként futott végig a lekerekítés mentén.
 */
export const dialogPT = {
  // Teljes képernyős maszk: sötétítés + enyhe háttérelmosás, középre igazítva.
  mask: { className: "fixed inset-0 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" },

  root: ({ props }) => {
    const radiusCls = RADIUS[props.radius] ?? RADIUS["3xl"];
    return {
      className: classNames(
        `flex flex-col max-h-[90vh] w-full max-w-xl overflow-hidden bg-white text-gray-700 ${SHADOW["2xl"]}`,
        radiusCls
      ),
    };
  },

  header: { className: "flex items-center justify-between gap-4 px-8 pt-6 pb-2" },
  headerTitle: { className: "text-lg font-semibold text-sze-primary" },
  headerIcons: { className: "flex items-center gap-1 -mr-2" },

  // A bezáró gomb a Button `text` variánsát kapja, mint a többi ikon-gomb.
  closeButton: {
    className: classNames(...BUTTON_BASE, RADIUS.full, "h-9 w-9 shrink-0", buttonVariantClasses({ text: true })),
  },
  closeButtonIcon: { className: "w-3.5 h-3.5" },

  content: { className: "px-8 py-3 overflow-y-auto leading-relaxed" },

  footer: { className: "px-8 pt-3 pb-6" },
};
