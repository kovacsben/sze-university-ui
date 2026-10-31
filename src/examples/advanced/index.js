import defineExamples from "../defineExamples";
import { radiusControl } from "../controls";

const modules = import.meta.glob("./*.jsx", { eager: true, import: "default" });
const sources = import.meta.glob("./*.jsx", { eager: true, query: "?raw", import: "default" });

export default defineExamples("advanced", modules, sources, [
  {
    file: "Dialog",
    title: "Dialog / Modal",
    description: "Modal párbeszéd - próbáld ki a lekerekítés élő módosítását",
    controls: [radiusControl("3xl")],
  },
  {
    file: "ConfirmDialog",
    title: "Confirm Dialog",
    description: "Megerősítésre kérő dialógus különböző típusokkal",
  },
  { file: "ConfirmPopUp", title: "Confirm PopUp", description: "Kisebb popup megerősítések gombokhoz" },
  { file: "Menu", title: "Menu", description: "Menü navigáció gombokkal" },
  { file: "Megamenu", title: "Megamenu", description: "Többoszlopos navigációs menü" },
  { file: "Menubar", title: "Menubar", description: "Alkalmazás fejléc menüsáv" },
  { file: "TieredMenu", title: "TieredMenu", description: "Hierarchikus összevont menü" },
  {
    file: "Message",
    title: "Message",
    description: "Egyedi értesítési üzenetek - próbáld ki a lekerekítés élő módosítását",
    controls: [radiusControl("lg")],
  },
  { file: "Messages", title: "Messages", description: "Több üzenet kezelése" },
  { file: "Toast", title: "Toast", description: "Értesítési toast üzenetek" },
  { file: "Tooltip", title: "Tooltip", description: "Hover tooltip tájékoztatás" },
]);
