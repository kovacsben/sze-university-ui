import defineExamples from "../defineExamples";
import { radiusControl, sizeControl } from "../controls";

const modules = import.meta.glob("./*.jsx", { eager: true, import: "default" });
const sources = import.meta.glob("./*.jsx", { eager: true, query: "?raw", import: "default" });

export default defineExamples("layout", modules, sources, [
  { file: "Accordion", title: "Accordion", description: "Kiterjeszthető szekciók az SZE információival" },
  {
    file: "Avatar",
    title: "Avatar",
    description:
      "Felhasználói profilképek több méretben és formában - próbáld ki a méret és forma élő módosítását",
    controls: [
      sizeControl(["small", "normal", "large", "xlarge"]),
      { prop: "shape", label: "Forma", options: ["circle", "square"], default: "circle" },
    ],
  },
  {
    file: "Breadcrumb",
    title: "Breadcrumb",
    description: "Navigációs útvonal az aktuális oldal helyzetének mutatására",
  },
  {
    file: "Card",
    title: "Card",
    description:
      "Tartalom megjelenítésére szolgáló komponens - próbáld ki a lekerekítés és árnyék élő módosítását",
    controls: [
      radiusControl("2xl"),
      { prop: "shadow", label: "Árnyék", options: ["sm", "base", "md", "lg", "xl", "2xl"], default: "md" },
    ],
  },
  {
    file: "Chip",
    title: "Chip",
    description: "Kis tagok, kategóriák és státuszok megjelenítésére - próbáld ki a lekerekítés élő módosítását",
    controls: [radiusControl("full")],
  },
  { file: "Divider", title: "Divider", description: "Tartalom szétválasztó komponens" },
  { file: "FieldSet", title: "FieldSet", description: "Form mezők csoportosítása" },
  { file: "Gallery", title: "Gallery", description: "Képgalériai megjelenítés" },
  { file: "Inplace", title: "Inplace", description: "Szerkeszthető szöveg megjelenítés" },
  { file: "Paginator", title: "Paginator", description: "Oldalazás komponens" },
  { file: "Panel", title: "Panel", description: "Kiterjeszthető panel komponens" },
  { file: "ProgressBar", title: "ProgressBar", description: "Haladási sáv komponens" },
  { file: "ProgressSpinner", title: "ProgressSpinner", description: "Betöltési spinner" },
  { file: "ScrollPanel", title: "ScrollPanel", description: "Görgethető panel" },
  { file: "Sidebar", title: "Sidebar", description: "Oldalsáv navigáció" },
  { file: "Skeleton", title: "Skeleton", description: "Betöltési placeholder" },
  { file: "Stepper", title: "Stepper", description: "Multi-step form" },
  { file: "Steps", title: "Steps", description: "Lépés indikátor" },
  { file: "TabMenu", title: "TabMenu", description: "Tab navigáció" },
  { file: "Timeline", title: "Timeline", description: "Esemény idővonal" },
  { file: "Rating", title: "Értékelés", description: "Csillag értékelés komponens" },
]);
