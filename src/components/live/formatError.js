/**
 * A fordítási és futási hibák magyar nyelvű, olvasható formája.
 *
 * A sucrase, a JS-motor és a React angol üzeneteit a leggyakoribb esetekre
 * lefordítjuk; az eredeti üzenet mindig megmarad (a hibakereséshez és a nem
 * ismert esetekhez). Sorszám és kódrészlet akkor jelenik meg, ha a hiba
 * helye ismert.
 */

const SOURCE_POS = /\s*\(\d+:\d+\)$/; // a sucrase a "(sor:oszlop)" részt az üzenet végére írja

const TRANSLATIONS = [
  [/^Unexpected token, expected "(.+)"$/, (m) => `Váratlan karakter – itt „${m[1]}” következne.`],
  [/^Unexpected token$/, () => "Váratlan karakter vagy kulcsszó. Ellenőrizd a zárójeleket és a tageket."],
  [/^Unexpected end of input$/, () => "Váratlanul véget ért a kód – hiányzik egy záró zárójel vagy tag."],
  [/^Unterminated string constant$/, () => "Lezáratlan szöveg (string) – hiányzik a záró idézőjel."],
  [/^Unterminated template$/, () => "Lezáratlan template string – hiányzik a záró ` jel."],
  [/^Unterminated JSX contents$/, () => "Lezáratlan JSX-tartalom – valószínűleg hiányzik egy záró tag."],
  [/^Unterminated regular expression$/, () => "Lezáratlan reguláris kifejezés."],
  [/^Unterminated comment$/, () => "Lezáratlan megjegyzés – hiányzik a */."],
  [/^Expected corresponding JSX closing tag for <(.+)>$/, (m) => `Hiányzó vagy rossz záró tag: </${m[1]}> kellene.`],
  [/^Identifier '(.+)' has already been declared$/, (m) => `A(z) „${m[1]}” azonosító már deklarálva van.`],
  [/^(.+) is not defined$/, (m) => `„${m[1]}” nincs definiálva – hiányzik az importja, vagy elírás?`],
  [/^(.+) is not a function$/, (m) => `„${m[1]}” nem függvény, mégis meghívtuk.`],
  [
    /^Cannot read properties of (undefined|null) \(reading '(.+)'\)$/,
    (m) => `A(z) „${m[2]}” tulajdonság nem olvasható, mert az érték ${m[1]}.`,
  ],
  [/^Element type is invalid/, () => "Érvénytelen elemtípus – nem létező komponenst használsz (elírás vagy hiányzó import)?"],
  [/^Objects are not valid as a React child/, () => "Objektum nem renderelhető közvetlenül; alakítsd szöveggé vagy elemmé."],
  [/^Too many re-renders/, () => "Túl sok újrarenderelés – valószínűleg a render közben hívsz setState-et."],
  [/^Rendered (more|fewer) hooks than/, () => "A hookok száma rendereléskor megváltozott – hookot csak feltétel nélkül, a komponens tetején hívj."],
  [/^Invalid hook call/, () => "Érvénytelen hookhívás – hookot csak komponens törzsében lehet hívni."],
];

const TITLES = {
  syntax: "Szintaktikai hiba",
  module: "Hiányzó modul",
  export: "Hiányzó export",
  runtime: "Futási hiba",
};

/** Néhány sor a hiba környezetéből, a hibás sor megjelölésével. */
function codeFrame(code, line, radius = 2) {
  if (!line || !code) return null;
  const lines = code.split("\n");
  if (line > lines.length) return null;
  const from = Math.max(1, line - radius);
  const to = Math.min(lines.length, line + radius);
  const frame = [];
  for (let n = from; n <= to; n++) frame.push({ n, text: lines[n - 1], current: n === line });
  return frame;
}

/**
 * @param {Error & {kind?: string, line?: number, column?: number}} error
 * @param {string} code a hibát okozó forráskód (a kódrészlethez)
 */
export default function formatError(error, code) {
  const kind = error?.kind || "runtime";
  const original = String(error?.message || error || "Ismeretlen hiba").replace(SOURCE_POS, "");
  const rule = TRANSLATIONS.find(([re]) => re.test(original));
  const message = rule ? rule[1](original.match(rule[0])) : original;
  const line = error?.line ?? null;
  const column = error?.column ?? null;

  let location = null;
  if (line) location = column != null ? `${line}. sor, ${column}. oszlop` : `${line}. sor`;

  return {
    title: TITLES[kind] || TITLES.runtime,
    location,
    message,
    // Az eredeti üzenetet csak akkor mutatjuk külön, ha le is fordítottuk.
    original: rule ? original : null,
    frame: codeFrame(code, line),
  };
}
