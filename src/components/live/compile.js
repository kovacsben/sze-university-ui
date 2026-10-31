import { transform } from "sucrase";
import * as React from "react";
import * as SzeUI from "../../sze-ui";
import * as adatok from "../../examples/adatok";
import { SOURCE_URL, lineFromStack } from "./sourceLocation";

/**
 * Élő példakód fordítása és kiértékelése a böngészőben.
 *
 * Ez a modul (és vele a sucrase) csak dinamikus import()-tal töltődik be:
 * a főoldalon akkor, amikor egy vezérlő átírja a kódot, illetve az iframe
 * előnézetben. A kártyák alapnézete a Vite által előre lefordított modult
 * rendereli, ahhoz nem kell futásidejű fordító.
 *
 * Miért sucrase: kicsi és gyors, és - ami a hibaüzenetekhez fontos - megtartja
 * a sorszámokat, így a futási hibák stackjéből visszafejthető a forrás sora.
 * Az "imports" transzformáció az import/export utasításokat CommonJS-szerű
 * require()/exports formára alakítja; a require-t az alábbi shim oldja fel.
 */

// Az __esModule jelzés kell, hogy a sucrase interop-segédje
// (`import React from "react"`) a `default` kulcsot használja.
const MODULES = {
  react: { __esModule: true, ...React, default: React },
  "sze-ui": { __esModule: true, ...SzeUI },
  "../adatok": { __esModule: true, ...adatok },
  "../adatok.js": { __esModule: true, ...adatok },
};

export const AVAILABLE_MODULES = ["react", "sze-ui", "../adatok"];

/** A fordítás vagy a kiértékelés hibája, a megjelenítéshez szükséges adatokkal. */
export class LiveError extends Error {
  constructor(kind, message, { line = null, column = null, cause } = {}) {
    super(message);
    this.name = "LiveError";
    this.kind = kind; // "syntax" | "module" | "export" | "runtime"
    this.line = line;
    this.column = column;
    this.cause = cause;
  }
}

function requireShim(specifier) {
  if (Object.prototype.hasOwnProperty.call(MODULES, specifier)) return MODULES[specifier];
  throw new LiveError(
    "module",
    `A(z) „${specifier}” modul nem érhető el a szerkesztőben. Elérhető modulok: ${AVAILABLE_MODULES.join(", ")}.`
  );
}

/**
 * Lefordítja és kiértékeli a példakódot, és visszaadja az alapértelmezett
 * exportként megadott React-komponenst. Hiba esetén LiveError-t dob.
 */
export function compile(code) {
  let js;
  try {
    js = transform(code, { transforms: ["jsx", "imports"], production: true }).code;
  } catch (err) {
    throw new LiveError("syntax", err.message, {
      line: err.loc?.line ?? null,
      column: err.loc?.column ?? null,
      cause: err,
    });
  }

  let fn;
  try {
    fn = new Function("React", "require", "exports", "module", `${js}\n//# sourceURL=${SOURCE_URL}`);
  } catch (err) {
    // A sucrase nem ellenőriz minden szintaktikai szabályt; amit átenged, azt
    // itt a JS-motor jelzi - sorszám nélkül.
    throw new LiveError("syntax", err.message, { cause: err });
  }

  const module = { exports: {} };
  try {
    fn(React, requireShim, module.exports, module);
  } catch (err) {
    if (err instanceof LiveError) throw err;
    throw new LiveError("runtime", err.message, { ...lineFromStack(err), cause: err });
  }

  const Component = module.exports.default;
  // React.memo / forwardRef eredménye objektum ($$typeof jelöléssel), az is érvényes.
  const isComponent = typeof Component === "function" || (Component && typeof Component === "object" && Component.$$typeof);
  if (!isComponent) {
    throw new LiveError(
      "export",
      "A példának egy React-komponenst kell alapértelmezettként exportálnia, pl.: export default function Pelda() { … }"
    );
  }
  return Component;
}
