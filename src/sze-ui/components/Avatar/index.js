/**
 * Avatar komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal az Avatar-t megkapják:
 * 
 * Helyett:  import Avatar from "./components/Avatar/Avatar.jsx";
 * 
 * Írhatnak: import { Avatar } from "./sze-ui";
 */

export { default as Avatar } from "./Avatar.jsx";
