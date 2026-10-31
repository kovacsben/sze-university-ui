/**
 * A futásidőben fordított példakód helyének visszafejtése a stackből.
 *
 * Külön modulban van, mert az error boundary a kártyák alapnézetét is védi, és
 * ehhez nem szabad behúznia a fordítót (compile.js -> sucrase) a fő csomagba.
 */

/** A hibák stackjében ezen a néven jelenik meg a példakód (//# sourceURL). */
export const SOURCE_URL = "sze-pelda.jsx";

/**
 * A `new Function` törzse előtt a V8 két sort szúr be
 * ("function anonymous(...", ") {"), ezért a stackben szereplő sorszám ennyivel
 * nagyobb a forrásbelinél. Más motoroknál ez eltérhet - a sor kiírása best effort.
 */
export const FUNCTION_LINE_OFFSET = 2;

/**
 * Futási hiba sora, ha a hiba a példakódban keletkezett; különben null.
 * Oszlopot szándékosan nem adunk: a sucrase a sorokat megtartja, de az első
 * sorba "use strict"-et és interop-segédeket szúr, így az oszlop félrevezető lenne.
 */
export function lineFromStack(error) {
  const match = String(error?.stack || "").match(/sze-pelda\.jsx:(\d+):(\d+)/);
  if (!match) return null;
  const line = Number(match[1]) - FUNCTION_LINE_OFFSET;
  return line > 0 ? { line } : null;
}
