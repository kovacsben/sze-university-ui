// PrimeReact utils-ból a classNames helper importálása (ternary és klasszikus megadásokat kombinál)
import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, controlSize } from "../tokens";


/**
 * Button Pass-Through (PT) stílusok
 * 
 * Ez a fájl a Button komponens összes Tailwind stílusát tartalmazza.
 * A PrimeReact "unstyled mode" + Pass-Through pattern segítségével működik.
 * 
 * Szerkezete:
 * - root: az egész gomb
 * - label: a gomb szövege
 * - icon: az ikon
 * - loadingIcon: a loading spinner
 */
/**
 * BUTTON_BASE: minden gombfelületre érvényes alapstílusok.
 *
 * Kiemelve a buttonPT.root-ból, hogy a Button-nal azonos kinézetű, de nem
 * <button> elemre rendereltetett kontrollok (pl. a SelectButton szegmensei,
 * amik role="button" div-ek) ugyanezt az alapot használhassák - egyetlen
 * forrásból. A méret (controlSize) és a variant külön jön hozzá.
 *
 * A `disabled:` állapotkezelés szándékosan NEM része: az csak valódi
 * <button>/form elemen hat, a div-alapú kontrollok maguk oldják meg.
 */
export const BUTTON_BASE = [
  "flex justify-center items-center inline-flex gap-2 font-medium transition",
  // Focus state: körülbelül 2px kék gyűrű
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
  // Active state: apró lefelé mozgás (press effect)
  "active:translate-y-px",
];

/**
 * buttonVariantClasses: a variant + severity színlogika.
 *
 * Szintén kiemelve, hogy a SelectButton pontosan ugyanazt a palettát kapja,
 * mint a Button - ha itt változik egy szín, ott is érvényesül.
 *
 * @param {object}  o
 * @param {string}  o.severity   - undefined | "secondary" | "success" | "warning" | "danger"
 * @param {boolean} o.link       - link variant (aláhúzott szöveg)
 * @param {boolean} o.text       - text variant (háttér csak hoverkor)
 * @param {boolean} o.outlined   - outlined variant (keret, nincs kitöltés)
 * @param {boolean} o.hoverLift  - hover-kori felfelé mozgás. Összeérő
 *   szegmenseknél (SelectButton) kikapcsolandó, mert ott az egyes elemek
 *   önálló elmozdulása megtörné a közös gombfelületet.
 * @param {boolean} o.shadow     - az outlined variant saját árnyéka. Összeérő
 *   szegmenseknél kikapcsolandó, mert ott az árnyék a csoport gyökerén van.
 */
export function buttonVariantClasses({ severity, link, text, outlined, hoverLift = true, shadow = true } = {}) {
  // Egységes hover-emelés, hogy a hosszú ternary-láncok olvashatók maradjanak.
  const lift = hoverLift ? "hover:-translate-y-0.5" : "";

  /**
   * LINK variant: egyszerű aláhúzott link
   * - Átlátszó háttér
   * - Aláhúzás, 4px offset
   * - Hover: nincs aláhúzás
   */
  if (link) {
    return "bg-transparent underline underline-offset-4 text-sze-primary hover:no-underline";
  }

  /**
   * TEXT variant: csak szöveg, egyedi háttér hover-kor
   *
   * Severity-k szerint:
   * - secondary: kék szöveg, kék-halványított háttér hover-kor
   * - success: zöld szöveg, zöld háttér hover-kor
   * - warning: narancssárga szöveg, narancssárga háttér hover-kor
   * - danger: piros szöveg, piros háttér hover-kor
   * - default: sötét kék szöveg, sötét kék halványított háttér hover-kor
   */
  if (text) {
    return classNames(
      severity === "secondary" ? "text-sze-secondary hover:bg-sze-secondary/10"
    : severity === "success"   ? "text-success hover:bg-success/10"
    : severity === "warning"   ? "text-warning hover:bg-warning/10"
    : severity === "danger"    ? "text-danger hover:bg-danger/10"
                               : "text-sze-primary hover:bg-sze-primary/10",
      lift
    );
  }

  /**
   * OUTLINED variant: keretezett gomb (border, nincs kitöltés)
   *
   * Severity-k szerint:
   * - secondary: kék keret és szöveg, kék-halványított háttér hover-kor
   * - success: zöld keret és szöveg, zöld háttér hover-kor
   * - warning: narancssárga keret, sötétebb narancssárga hover-kor (bg-warning/80)
   * - danger: piros keret és szöveg, piros háttér hover-kor
   * - default: sötét kék keret, sötét kék kitöltés hover-kor + fehér szöveg
   */
  if (outlined) {
    return classNames(
      severity === "secondary" ? "border border-sze-secondary text-sze-secondary hover:bg-sze-secondary/10"
    : severity === "success"   ? "border border-success text-success hover:bg-success/10"
    : severity === "warning"   ? "border border-warning text-warning hover:bg-warning/80"
    : severity === "danger"    ? "border border-danger text-danger hover:bg-danger/10"
                               : classNames("border border-sze-primary text-sze-primary hover:bg-sze-primary hover:text-white", shadow && SHADOW.sm),
      lift
    );
  }

  /**
   * SOLID variant: kitöltött gomb (default)
   *
   * Severity-k szerint:
   * - secondary: kék háttér, fehér szöveg, opacity csökkenés hover-kor
   * - success: zöld háttér, fehér szöveg, opacity csökkenés hover-kor
   * - warning: sárga háttér, FEKETE szöveg (kontrasztért), opacity csökkenés hover-kor
   * - danger: piros háttér, fehér szöveg, opacity csökkenés hover-kor
   * - default: sötét kék háttér, fehér szöveg, sötétebb kék hover-kor
   */
  return classNames(
    severity === "secondary" ? "bg-sze-secondary text-white hover:opacity-90"
  : severity === "success"   ? "bg-success text-white hover:opacity-90"
  : severity === "warning"   ? "bg-warning text-black hover:opacity-90"
  : severity === "danger"    ? "bg-danger text-white hover:opacity-90"
                             : "bg-sze-primary text-white hover:bg-sze-primary-900",
    lift
  );
}

export const buttonPT = {
  /**
   * root: a Button gyökér elemének stílusa
   *
   * Ez a fő styling logika:
   * 1. Alapstílusok (BUTTON_BASE, layout/forma/transition)
   * 2. Méretváltások (small, large, normal)
   * 3. Variant-ok + severity-szintek (buttonVariantClasses)
   */
  root: ({ props }) => {
    // radius prop-pal élőben felülírható, alapértelmezetten a pill-forma (3xl)
    const radiusCls = RADIUS[props.radius] ?? RADIUS["3xl"];

    /**
     * Méretváltozatok - a központi CONTROL_SIZE tokenből (src/sze-ui/theme/tokens.js)
     * - small: h-9 (36px magasság), px-3 (12px oldal padding), text-sm
     * - normal: h-10 (40px magasság), px-4 (16px oldal padding), text-sm
     * - large: h-11 (44px magasság), px-5 (20px oldal padding), text-base
     */
    const cs = controlSize(props.size);
    const sizeCls = `${cs.height} ${cs.padding} ${cs.text}`;

    // A text/link variant lapos: nincs háttere, így az árnyék (ami kiemelkedést
    // sugallna) fehér korongnak látszana a színes felületeken.
    const isFlat = props.text || props.link;

    return {
      className: classNames(
        ...BUTTON_BASE,
        radiusCls,
        !isFlat && SHADOW.sm,
        // Disabled state: 60% átlátszóság, nincsenek kattintások
        "disabled:opacity-60 disabled:pointer-events-none",
        sizeCls,
        buttonVariantClasses(props)
      ),
    };
  },

  /**
   * label: a gomb szövegének stílusa
   * - truncate: túl hosszú szöveg esetén "..." pontokkal csonkított
   */
  // Make the label a flex container so its contents (text/icon) align
  // vertically with the icon span rendered by PrimeReact.
  // Removed `truncate` per request — no text truncation needed.
  //
  // PrimeReact mindig renderel egy <span> label elemet akkor is, ha
  // nincs label (üres &nbsp;-t tesz bele), ha nincs props.children sem.
  // Ez az üres span flex-item-ként foglal helyet a gombban, ezért az
  // ikon soha nem lesz pontosan középen (csak ikonos gomboknál). Mivel
  // a span generálása magában a PrimeReact Button komponensben van
  // hardkódolva, PT-ből nem tudjuk megakadályozni a létrehozását - de
  // `hidden`-nel kivehetjük a layout-ból, ha nincs valódi szöveg/gyerek.
  label: ({ props }) => ({
    className: classNames(
      "flex items-center",
      !props.label && !props.children && "hidden"
    ),
  }),

  /**
   * icon: az ikon stílusa
   * - flex items-center justify-center: az ikon centrálása
   * - Ha jobbra van az ikon (iconPos === "right"): order-2 (jobbra kerül), ml-2 (bal margó)
   * - Ha balra (default): mr-2 (jobb margó)
   */
  icon: ({ props }) => ({ className: classNames(" flex items-center justify-center") }),

  /**
   * loadingIcon: a loading spinner stílusa
   * - animate-spin: Tailwind beépített spinner animáció (360° forgás)
   */
  loadingIcon: { className: "animate-spin" },
};
