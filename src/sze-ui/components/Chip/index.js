/**
 * Chip komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal a Chip-et megkapják:
 * 
 * Helyett:  import Chip from "./components/Chip/Chip.jsx";
 * 
 * Írhatnak: import { Chip } from "./sze-ui";
 */

export { default as Chip } from "./Chip.jsx";
