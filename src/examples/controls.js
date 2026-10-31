/**
 * A Playground-vezérlők közös definíciói.
 *
 * Egy vezérlő a példakódban a `prop="érték"` JSX-attribútum literálját írja át
 * (lásd src/components/live/applyControls.js). Ezért a `default` értéknek
 * pontosan meg kell egyeznie azzal, ami a példafájlban szerepel – dev módban a
 * Playground figyelmeztet, ha a kettő elcsúszik.
 */

export const RADIUS_OPTIONS = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];

export const radiusControl = (def) => ({
  prop: "radius",
  label: "Lekerekítés",
  options: RADIUS_OPTIONS,
  default: def,
});

export const sizeControl = (options = ["small", "normal", "large"], def = "normal") => ({
  prop: "size",
  label: "Méret",
  options,
  default: def,
});
