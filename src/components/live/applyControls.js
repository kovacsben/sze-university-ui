/**
 * A Playground-vezérlők "kódsablon-átírása".
 *
 * A sablon maga az eredeti példakód: minden vezérelt prop a fájlban literál
 * JSX-attribútumként szerepel (pl. radius="3xl"). A vezérlő ennek az
 * attribútumnak az értékét cseréli le a kód MINDEN előfordulásában. Mivel csak a
 * prop="..." mintát érinti, a vezérlők kézi szerkesztés után is működnek, és a
 * kód többi részéhez nem nyúlnak.
 */

// A prop neve egyszerű azonosító (radius, size, shape...), így regexbe
// escape nélkül tehető; ami nem ilyen, azt a vezérlő nem írja át.
const PROP_NAME = /^[A-Za-z][\w-]*$/;

export function applyControls(code, controls = [], values = {}) {
  return controls.reduce((acc, control) => {
    const value = values[control.prop];
    if (value == null || !PROP_NAME.test(control.prop)) return acc;
    // A prop előtt szóköz vagy sortörés áll, így pl. a data-size nem egyezik a size-zal.
    const re = new RegExp("(\\s" + control.prop + '=)"[^"]*"', "g");
    return acc.replace(re, '$1"' + value + '"');
  }, code);
}

/** A vezérlők alapértékei { prop: default } alakban. */
export function defaultValues(controls = []) {
  return Object.fromEntries(controls.map((c) => [c.prop, c.default]));
}
