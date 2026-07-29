/**
 * FieldSet komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal a FieldSet-et megkapják:
 * 
 * Helyett:  import FieldSet from "./components/FieldSet/FieldSet.jsx";
 * 
 * Írhatnak: import { FieldSet } from "./sze-ui";
 */

export { default as FieldSet } from "./FieldSet.jsx";
