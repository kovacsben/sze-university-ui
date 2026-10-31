import { applyControls, defaultValues } from "../components/live/applyControls";

/**
 * Egy fül példáinak összeállítása.
 *
 * Minden példa egyetlen .jsx fájl. A fül index.js-e kétszer globolja ugyanazokat
 * a fájlokat: egyszer modulként (a Vite fordítja le -> `Component`), egyszer
 * `?raw`-ként (a fájl szövege -> `code`). Így a megjelenített és a futó kód
 * ugyanannak a fájlnak a tartalma, a kettő nem csúszhat szét.
 *
 * Az import.meta.glob hívásnak literálisan a fül saját fájljában kell lennie
 * (a Vite statikusan elemzi), ezért itt csak a párosítás és az ellenőrzés van.
 */
export default function defineExamples(tab, modules, sources, meta) {
  // Windowsos checkoutnál a fájl CRLF sorvégű lehet, a CodeMirror viszont
  // \n-nel adja vissza a szöveget - normalizálás nélkül minden kód
  // "módosítottnak" látszana.
  const sourceOf = (file) => sources[`./${file}.jsx`].replace(/\r\n/g, "\n");
  const exists = (file) => Boolean(modules[`./${file}.jsx`]);

  if (import.meta.env.DEV) {
    const listed = new Set(meta.map((m) => m.file));
    Object.keys(modules)
      .map((key) => key.slice(2, -4)) // "./Variants.jsx" -> "Variants"
      .filter((file) => !listed.has(file))
      .forEach((file) => console.warn(`[examples/${tab}] ${file}.jsx nincs felvéve a META listába.`));
    meta
      .filter((m) => !exists(m.file))
      .forEach((m) => console.warn(`[examples/${tab}] A META-ban szereplő ${m.file}.jsx nem létezik.`));
    // A vezérlők a fájl literáljait írják át: az alapértékeknek egyezniük kell velük,
    // különben az első vezérlőkattintás a fájlban nem szereplő eltérést is hozna.
    meta
      .filter((m) => m.controls && exists(m.file))
      .filter((m) => applyControls(sourceOf(m.file), m.controls, defaultValues(m.controls)) !== sourceOf(m.file))
      .forEach((m) =>
        console.warn(`[examples/${tab}] ${m.file}.jsx: a vezérlők alapértékei nem egyeznek a fájlban szereplő értékekkel.`)
      );
  }

  return meta
    .filter((m) => exists(m.file))
    .map((m) => ({
      ...m,
      id: `${tab}/${m.file}`,
      Component: modules[`./${m.file}.jsx`],
      code: sourceOf(m.file),
    }));
}
