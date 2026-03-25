/**
 * Button komponensek exportja
 * 
 * Ez az "index.js" fájl a barrel export pattern-t követi.
 * Lehetővé teszi, hogy a felhasználók egyetlen import-tal minden Button-t megkapjanak:
 * 
 * Helyett:  import Button from "./components/Button/Button.jsx";
 *           import IconButton from "./components/Button/IconButton.jsx";
 * 
 * Írhatnak: import { Button, IconButton, ButtonGroup } from "./components/Button";
 */

// A standard Button komponens exportálása (variant support, fullWidth, stb.)
export { default as Button } from "./Button.jsx";

// Az IconButton komponens exportálása (csak ikon, négyzet alakú)
export { default as IconButton } from "./IconButton.jsx";

// A ButtonGroup komponens exportálása (gombcsoportok tárolója)
export { default as ButtonGroup } from "./ButtonGroup.jsx";
