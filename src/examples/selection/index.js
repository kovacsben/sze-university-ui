import defineExamples from "../defineExamples";
import { radiusControl, sizeControl } from "../controls";

const modules = import.meta.glob("./*.jsx", { eager: true, import: "default" });
const sources = import.meta.glob("./*.jsx", { eager: true, query: "?raw", import: "default" });

export default defineExamples("selection", modules, sources, [
  {
    file: "Dropdown",
    title: "Lenyitható Lista",
    description: "Opcióból kiválasztás - próbáld ki a lekerekítés és méret élő módosítását",
    controls: [radiusControl("xl"), sizeControl()],
  },
  { file: "AutoComplete", title: "Automatikus Kiegészítés", description: "Javaslatokkal dolgozó input" },
  { file: "Checkbox", title: "Jelölőnégyzet", description: "Logikai értékek választása" },
  { file: "RadioButton", title: "Rádiógomb", description: "Kizárólagos választás" },
  { file: "MultiSelect", title: "Multi-Select", description: "Több opció kiválasztása" },
  {
    file: "MultiStateCheckbox",
    title: "Jogi Statusz Jelölőnégyzet (Multi-State)",
    description: "Három állapotú jelölőnégyzet",
  },
  { file: "TriStateCheckbox", title: "Háromállapotú Jelölőnégyzet", description: "Háromállapotú kiválasztás" },
  { file: "Listbox", title: "Listbox", description: "Lista alapú kiválasztás" },
  { file: "TreeSelect", title: "TreeSelect", description: "Fa alapú kiválasztás" },
  { file: "Tree", title: "Fa Komponens", description: "Fa szerkezetű adatok megjelenítésére" },
]);
