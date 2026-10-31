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
  if (import.meta.env.DEV) {
    const listed = new Set(meta.map((m) => m.file));
    Object.keys(modules)
      .map((key) => key.slice(2, -4)) // "./Variants.jsx" -> "Variants"
      .filter((file) => !listed.has(file))
      .forEach((file) => console.warn(`[examples/${tab}] ${file}.jsx nincs felvéve a META listába.`));
    meta
      .filter((m) => !modules[`./${m.file}.jsx`])
      .forEach((m) => console.warn(`[examples/${tab}] A META-ban szereplő ${m.file}.jsx nem létezik.`));
  }

  return meta
    .filter((m) => modules[`./${m.file}.jsx`])
    .map((m) => ({
      ...m,
      id: `${tab}/${m.file}`,
      Component: modules[`./${m.file}.jsx`],
      // Windowsos checkoutnál a fájl CRLF sorvégű lehet, a CodeMirror viszont
      // \n-nel adja vissza a szöveget - normalizálás nélkül minden kód
      // "módosítottnak" látszana.
      code: sources[`./${m.file}.jsx`].replace(/\r\n/g, "\n"),
    }));
}
