/**
 * Card komponens exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal a Card-ot megkapják:
 * 
 * Helyett:  import Card from "./components/Card/Card.jsx";
 * 
 * Írhatnak: import { Card } from "./sze-ui";
 */

export { default as Card } from "./Card.jsx";
