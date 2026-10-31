import * as React from "react";
import { Knob as PKnob } from "primereact/knob";

/**
 * A PrimeReact ív-geometriája: a skála 240°-nál (minimum) kezdődik és -60°-nál
 * (maximum) ér véget, alul 60°-os réssel. Ugyanezek az értékek a PrimeReact
 * belső `minRadians` / `maxRadians` konstansai - a rajzolt ív és az általunk
 * számolt érték csak így marad szinkronban.
 */
const MIN_ANGLE = (4 * Math.PI) / 3; // 240° - minimum
const MAX_ANGLE = -Math.PI / 3; // -60° - maximum
const GAP_START = -(2 * Math.PI) / 3; // -120° - a holt zóna bal széle
const GAP_MID = (GAP_START + MAX_ANGLE) / 2; // -90° - a rés közepe

/**
 * Kurzorszög -> érték. A szög az SVG középpontjához képest értendő, radiánban,
 * `Math.atan2` konvenció szerint (jobbra 0°, felfelé +90°).
 */
function angleToValue(angle, min, max, step) {
  let a = angle;

  if (a < GAP_START) {
    // A rés bal oldala: az atan2 itt -180°..-120°-ot ad, ami a skálán a
    // 180°..240° tartomány (vagyis az ív legeleje).
    a += 2 * Math.PI;
  } else if (a < MAX_ANGLE) {
    // Holt zóna a gomb alján. A PrimeReact itt egyszerűen nem frissít, amitől
    // az érték beragad; mi a közelebbi véghez tapasztjuk, így a húzás a rés
    // fölött sem akad meg.
    a = a < GAP_MID ? MIN_ANGLE : MAX_ANGLE;
  }

  const ratio = (a - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE);
  const raw = ratio * (max - min) + min;
  const snapped = Math.round((raw - min) / step) * step + min;

  return Math.min(max, Math.max(min, snapped));
}

/**
 * SZE Knob komponens - kerek gomb felület numerikus érték beállításához.
 *
 * ## Miért van saját pointer-kezelése?
 *
 * A PrimeReact Knob a húzást egy `window`-ra kötött `mousemove`-ból számolja,
 * de `event.offsetX` / `event.offsetY`-t olvas ki belőle. Azok viszont a
 * kurzor ALATTI elemhez képest mért eltolást adják, nem a gombhoz képestit -
 * amint a kurzor elhagyja az SVG-t, a számolt szög a holt zónába esik, és az
 * érték egyszerűen beragad (mérve: a 120px-es SVG-n kívül húzva az érték
 * végig 80 maradt). Ez a komponens "akadozása".
 *
 * Ezért a `readOnly` propot adjuk le a PrimeReactnek: ettől a saját
 * `mousemove` / `mouseup` / `touchmove` figyelői be sem kötnek
 * (`useEventListener({ when: false })`), a rajzolás viszont változatlan. A
 * húzást mi kezeljük, pointer capture-rel: a lenyomás pillanatától minden
 * mozgást megkapunk, akármeddig is visszük a kurzort, a szöget pedig az SVG
 * tényleges befoglalójából számoljuk.
 *
 * A billentyűzet-kezelést (nyilak, Home/End, PageUp/PageDown) továbbra is a
 * PrimeReact végzi: az a kód nem az `offsetX`-re épül, tehát helyes. A
 * `tabIndex`-et viszont kifejezetten beállítjuk a `pt.svg`-n keresztül, hogy
 * a fókuszálhatóság ne a `readOnly` PrimeReact-beli kezelésén múljon.
 *
 * @component
 *
 * Használható propok:
 * - value (number): Az aktuális érték (default: 0)
 * - onChange (function): Callback az érték változásakor: onChange({ value })
 * - min / max (number): Értékhatárok (default: 0 / 100)
 * - step (number): Lépésköz (default: 1)
 * - disabled (boolean): Letiltja a komponenst (default: false)
 * - readOnly (boolean): Csak olvasható mód (default: false)
 * - strokeWidth (number): Az ív vastagsága a 100-as viewBox-ban (default: 6)
 * - size (number): Az SVG mérete pixelben (default: 120)
 * - showValue (boolean): Mutassa-e az értéket középen (default: true)
 * - valueTemplate (string): Sablon az értékhez, pl. "{value}%"
 * - valueColor / rangeColor / textColor (string): a kitöltött ív, a háttérív
 *   és a felirat színe - SZE-s alapértékekkel
 *
 * @example
 * <Knob value={num} onChange={(e) => setNum(e.value)} min={0} max={100} />
 */
export default function Knob({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  readOnly = false,
  valueColor = "var(--color-sze-primary)",
  rangeColor = "color-mix(in srgb, var(--color-sze-primary) 18%, white)",
  textColor = "var(--color-sze-primary)",
  strokeWidth = 6,
  size = 120,
  pt,
  ...props
}) {
  const svgRef = React.useRef(null);
  const interactive = !disabled && !readOnly;

  /** A kurzorpozícióból értéket számol az SVG tényleges középpontja alapján. */
  const valueFromPointer = React.useCallback(
    (event) => {
      const svg = svgRef.current;
      if (!svg) return null;

      const rect = svg.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      // Az SVG y tengelye lefelé nő, a szögszámítás viszont felfelé.
      const dy = rect.top + rect.height / 2 - event.clientY;
      if (dx === 0 && dy === 0) return null;

      return angleToValue(Math.atan2(dy, dx), min, max, step);
    },
    [min, max, step]
  );

  const commit = React.useCallback(
    (event) => {
      const next = valueFromPointer(event);
      if (next !== null && next !== value) onChange?.({ value: next });
    },
    [valueFromPointer, onChange, value]
  );

  const handlePointerDown = (event) => {
    // Csak az elsődleges gomb húzzon; a jobbklikk ne állítsa át az értéket.
    if (!interactive || event.button !== 0) return;
    event.preventDefault();
    svgRef.current?.setPointerCapture(event.pointerId);
    commit(event);
  };

  const handlePointerMove = (event) => {
    if (!interactive) return;
    // Csak akkor húzunk, ha nálunk van a pointer - különben a sima
    // egérmozgás is állítgatná az értéket.
    if (!svgRef.current?.hasPointerCapture(event.pointerId)) return;
    commit(event);
  };

  const handlePointerUp = (event) => {
    if (svgRef.current?.hasPointerCapture(event.pointerId)) {
      svgRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const knobPt = {
    ...pt,
    svg: {
      ref: svgRef,
      // A readOnly miatt a PrimeReact -1-et adna; itt állítjuk vissza, hogy a
      // gomb Tabbal elérhető maradjon.
      tabIndex: disabled ? -1 : 0,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      ...pt?.svg,
    },
  };

  return (
    <PKnob
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      // Lásd a komponens leírását: ez kapcsolja ki a PrimeReact hibás
      // húzás-figyelőit, hogy a sajátunk vehesse át.
      readOnly
      valueColor={valueColor}
      rangeColor={rangeColor}
      textColor={textColor}
      strokeWidth={strokeWidth}
      size={size}
      pt={knobPt}
      {...props}
    />
  );
}
