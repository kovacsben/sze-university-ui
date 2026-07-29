import { Knob as PKnob } from "primereact/knob";

/**
 * SZE Knob komponens – egy kerekgomb felület érték beállításához SZE-s default stílussal.
 * 
 * @component
 * 
 * Használható propok:
 * - value (number): Az aktuális érték (default: 0)
 * - onChange (function): Callback amikor az érték megváltozik: onChange(newValue)
 * - min (number): Minimum érték (default: 0)
 * - max (number): Maximum érték (default: 100)
 * - step (number): Lépés nagysága (default: 1)
 * - disabled (boolean): Letiltja a komponenst (default: false)
 * - readonly (boolean): Csak olvasható mód (default: false)
 * - strokeWidth (number): Az ütés vastagsága pixelben (default: 14)
 * - size (number): Az SVG canvas mérete pixelben (default: 100)
 * - showValue (boolean): Mutassa az értéket a közepén (default: true)
 * - valueTemplate (string): Template az érték megjelenítéshez, pl: "{value}%"
 * - valueColor (string): Az érték ív színe - SZE default: var(--color-sze-primary)
 * - rangeColor (string): A háttér ív színe - SZE default: rgba-SZE-primary 20%
 * - textColor (string): A szöveg színe - SZE default: currentColor
 * - className (string): CSS osztály az SVG root elemhez
 * 
 * @example
 * <Knob 
 *   value={50} 
 *   onChange={(val) => setValue(val)}
 *   min={0}
 *   max={100}
 *   step={5}
 * />
 */
export default function Knob({
  valueColor = "var(--color-sze-primary)",
  rangeColor = "color-mix(in srgb, var(--color-sze-primary) 15%, white)",
  textColor  = "var(--color-sze-primary)",
  strokeWidth = 6,
  size = 120,
  ...props
}) {
  return (
    <PKnob
      valueColor={valueColor}
      rangeColor={rangeColor}
      textColor={textColor}
      strokeWidth={strokeWidth}
      size={size}
      {...props}
    />
  );
}
