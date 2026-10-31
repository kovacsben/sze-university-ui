import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, controlSize } from "../tokens";
import { BUTTON_BASE, buttonVariantClasses } from "./button";

/**
 * SelectButton Pass-Through (PT) stílusok
 *
 * A szegmensek az alap Button kinézetét kapják: ugyanaz a BUTTON_BASE
 * (layout, focus-gyűrű, press-effekt), ugyanaz a CONTROL_SIZE méretskála és
 * ugyanaz a variant-paletta (src/sze-ui/theme/pt/button.js) - így ha a Button
 * színe vagy mérete változik, a SelectButton automatikusan követi.
 *
 * Leképezés:
 * - kiválasztott szegmens  -> Button SOLID variant (bg-sze-primary, fehér szöveg)
 * - nem kiválasztott       -> Button OUTLINED variant (keret + sze-primary szöveg)
 *
 * A csoport egyetlen, összefüggő gombfelület marad: a pill-lekerekítés és az
 * árnyék a gyökéren van, a szegmensek csak a két szélen kerekednek.
 */

/** A Button pill-formája; a csoport külső íve és a szélső szegmensek is ezt kapják. */
const GROUP_RADIUS = "3xl";

/**
 * Egy szegmens osztályai.
 *
 * @param {object} props   - a SelectButton saját propjai (size, severity, ...)
 * @param {object} context - { selected, disabled, option } az adott opcióhoz
 */
function segmentClasses(props, context) {
  const cs = controlSize(props.size);

  return classNames(
    ...BUTTON_BASE,
    `${cs.height} ${cs.padding} ${cs.text}`,

    // A szegmensek kitöltik a gyökeret. Alapesetben (inline-flex, szélesség
    // nélkül) ez nem változtat semmin, de ha a hívó szélességet ad a
    // csoportnak (pl. className="w-full"), akkor a szegmensek nőnek vele -
    // különben a pill jobb oldalán üres, árnyékolt sáv maradna.
    "grow",

    // A Button variant-logikája. hoverLift kikapcsolva: összeérő szegmenseknél
    // az egyedi felfelé mozgás megtörné a közös gombfelületet.
    buttonVariantClasses({
      severity: props.severity,
      outlined: !context.selected,
      hoverLift: false,
      // Az árnyék a csoport gyökerén ül, szegmensenként befelé rajzolódna.
      shadow: false,
    }),

    // A solid variantnak magától nincs kerete, viszont keret nélkül 1px-szel
    // alacsonyabb lenne a szomszédjainál. Saját színű kerettel a box-model
    // azonos marad, a keret mégsem látszik.
    context.selected && "border border-sze-primary hover:border-sze-primary-900",

    // Csak a két szélső szegmens kerekedik - középen egyenes marad az él.
    // A classnevek szándékosan literálok (nem a RADIUS_* tokenből interpolálva):
    // Tailwind v4 statikusan szkennel, egy `first:${...}` töredékhez nem
    // generálna CSS-t. Érték szerint a GROUP_RADIUS-szal tart együtt.
    "first:rounded-l-3xl last:rounded-r-3xl",

    // Az egymás melletti keretek átfedése, hogy ne duplázódjanak 2px-re.
    // A relative + z-index miatt a kiválasztott szegmens kerete kerül felülre.
    "relative [&:not(:first-child)]:-ml-px",
    context.selected && "z-10",

    // A SelectButton szegmense role="button" div, nem <button>: a `disabled:`
    // variant nem hatna rá, ezért a context alapján állítjuk be.
    context.disabled ? "opacity-60 pointer-events-none" : "cursor-pointer"
  );
}

export const selectButtonPT = {
  // Külső konténer: a pill-forma és az árnyék a teljes csoportra vonatkozik,
  // így a szegmensek együtt olvasódnak egyetlen gombfelületként.
  // Nincs overflow-hidden: az levágná a szélső szegmensek focus-gyűrűjét.
  root: { className: `inline-flex items-stretch ${RADIUS[GROUP_RADIUS]} ${SHADOW.sm}` },

  button: ({ props, context }) => ({ className: segmentClasses(props, context) }),
};

/**
 * Sötét felületre szánt változat: a nem kiválasztott szegmens világos kerettel
 * és szöveggel rajzolódik, a kiválasztott ugyanúgy solid primary marad.
 */
export const selectButtonPTDark = {
  ...selectButtonPT,
  button: ({ props, context }) => ({
    className: classNames(
      segmentClasses(props, context),
      !context.selected && "border-white/40 text-white hover:bg-white/10 hover:text-white"
    ),
  }),
};
