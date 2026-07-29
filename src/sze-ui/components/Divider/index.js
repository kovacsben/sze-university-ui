/**
 * Divider komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal a Divider-t megkapják:
 * 
 * Helyett:  import Divider from "./components/Divider/Divider.jsx";
 * 
 * Írhatnak: import { Divider } from "./sze-ui";
 */

export { default as Divider } from "./Divider.jsx";
