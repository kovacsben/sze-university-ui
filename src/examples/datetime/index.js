import defineExamples from "../defineExamples";

const modules = import.meta.glob("./*.jsx", { eager: true, import: "default" });
const sources = import.meta.glob("./*.jsx", { eager: true, query: "?raw", import: "default" });

export default defineExamples("datetime", modules, sources, [
  { file: "CalendarSingle", title: "Naptár - Egynap", description: "Egyetlen nap kiválasztása" },
  { file: "CalendarRange", title: "Naptár - Tartomány", description: "Dátumtartomány kiválasztása" },
  { file: "CalendarTime", title: "Naptár - Idővel", description: "Dátum és idő kiválasztása" },
  { file: "TimePicker", title: "Idő Választó", description: "Idő kiválasztása" },
]);
