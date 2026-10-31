import defineExamples from "../defineExamples";
import { radiusControl, sizeControl } from "../controls";

const modules = import.meta.glob("./*.jsx", { eager: true, import: "default" });
const sources = import.meta.glob("./*.jsx", { eager: true, query: "?raw", import: "default" });

export default defineExamples("buttons", modules, sources, [
  {
    file: "Variants",
    title: "Gomb Variációk",
    description: "Összes rendelkezésre álló gomb stil - próbáld ki a lekerekítés és méret élő módosítását",
    controls: [radiusControl("3xl"), sizeControl()],
  },
  { file: "Severity", title: "Gombok - Severity Szintek", description: "Különböző fontosságot jelző szintek" },
  { file: "IconButtons", title: "Ikon Gombok", description: "Csak ikonokat tartalmazó gombok" },
  { file: "ButtonGroup", title: "Gombcsoport", description: "Összekapcsolt gombok" },
  { file: "SplitButton", title: "Lenyitható Gomb (SplitButton)", description: "Gomb menüvel" },
  { file: "ToggleButton", title: "Toggle Gomb", description: "Bekapcsolható/kikapcsolható gomb" },
  { file: "SelectButton", title: "Gomb Kiválasztás", description: "Gombok közötti választás" },
  { file: "Toolbar", title: "Eszköztár", description: "Eszköztár gombok gyűjteménye" },
]);
