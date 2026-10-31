import defineExamples from "../defineExamples";
import { radiusControl, sizeControl } from "../controls";

const modules = import.meta.glob("./*.jsx", { eager: true, import: "default" });
const sources = import.meta.glob("./*.jsx", { eager: true, query: "?raw", import: "default" });

export default defineExamples("inputs", modules, sources, [
  {
    file: "TextInput",
    title: "Szöveg Input",
    description: "Alapvető szöveg beviteli mezők - próbáld ki a lekerekítés és méret élő módosítását",
    controls: [radiusControl("3xl"), sizeControl()],
  },
  { file: "KeyFilter", title: "Szűrt Input", description: "Speciális szűrésű bevitel" },
  { file: "Password", title: "Jelszó Input", description: "Biztonságos jelszó bevitel" },
  { file: "IconField", title: "Ikon Mezők", description: "Input ikonokkal" },
  { file: "InputGroup", title: "Input Csoport", description: "Csoportosított inputok" },
  { file: "FloatLabel", title: "Float Label", description: "Úszó címkés inputok" },
  { file: "InputOtp", title: "Bankkártya adatok bevitele", description: "3x input egy csoportban" },
  { file: "Editor", title: "Rich Text Editor", description: "HTML szerkesztés" },
  { file: "Slider", title: "Csúszka", description: "Numerikus értékek kiválasztása" },
  { file: "Knob", title: "Forgó Gomb", description: "Numerikus bevitel gömbön keresztül" },
]);
