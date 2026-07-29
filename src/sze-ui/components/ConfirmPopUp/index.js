/**
 * ConfirmPopUp komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal a ConfirmPopUp-ot megkapják:
 * 
 * Helyett:  import ConfirmPopUp from "./components/ConfirmPopUp/ConfirmPopUp.jsx";
 * 
 * Írhatnak: import { ConfirmPopUp } from "./sze-ui";
 */

export { default as ConfirmPopUp } from "./ConfirmPopUp.jsx";
