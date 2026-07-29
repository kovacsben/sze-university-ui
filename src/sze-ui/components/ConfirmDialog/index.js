/**
 * ConfirmDialog komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal a ConfirmDialog-ot megkapják:
 * 
 * Helyett:  import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog.jsx";
 * 
 * Írhatnak: import { ConfirmDialog } from "./sze-ui";
 */

export { default as ConfirmDialog } from "./ConfirmDialog.jsx";
