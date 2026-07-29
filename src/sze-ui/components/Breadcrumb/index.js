/**
 * Breadcrumb komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal a Breadcrumb-ot megkapják:
 * 
 * Helyett:  import Breadcrumb from "./components/Breadcrumb/Breadcrumb.jsx";
 * 
 * Írhatnak: import { Breadcrumb } from "./sze-ui";
 */

export { default as Breadcrumb } from "./Breadcrumb.jsx";
