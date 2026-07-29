/**
 * Accordian komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal az Accordian-t megkapják:
 * 
 * Helyett:  import Accordian from "./components/Accordian/Accordian.jsx";
 * 
 * Írhatnak: import { Accordian } from "./sze-ui";
 */

export { default as Accordian } from "./Accordian.jsx";
