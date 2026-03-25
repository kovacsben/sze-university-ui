// PrimeReact utils-ból a classNames helper importálása (ternary és klasszikus megadásokat kombinál)
import { classNames } from "primereact/utils";


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
export const buttonPT = {
  /**
   * root: a Button gyökér elemének stílusa
   * 
   * Ez a fő styling logika:
   * 1. Alapstílusok (layout, forma, transition)
   * 2. Méretváltások (small, large, normal)
   * 3. Variant-ok (link, text, outlined, solid)
   * 4. Severity-szintek (primary, secondary, success, warning, danger)
   */
  root: ({ props }) => {
    // ⚠️ MEGJEGYZÉS: base1 az igazi, base csak typo (nem használt)
    
    /**
     * Alapstílusok - minden gombra érvényesülnek
     */
    const base1 = [
      "inline-flex items-center justify-center gap-2 rounded-3xl font-medium transition",
      // Focus state: körülbelül 2px kék gyűrű
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
      // Disabled state: 60% átlátszóság, nincsenek kattintások
      "disabled:opacity-60 disabled:pointer-events-none",
      // Active state: apró lefelé mozgás (press effect)
      "active:translate-y-px"
    ];

    /**
     * Méretváltozatok
     * - small: h-9 (36px magasság), px-3 (12px oldal padding), text-sm
     * - normal: h-10 (40px magasság), px-4 (16px oldal padding), text-sm
     * - large: h-11 (44px magasság), px-5 (20px oldal padding), text-base
     */
    const sizeCls =
      props.size === "small" ? "h-9 px-3 text-sm"
    : props.size === "large" ? "h-11 px-5 text-base"
    : "h-10 px-4 text-sm"; // normal (default)

    /**
     * Variant-logika: meghatározza a gomb kinézetét
     * PrimeReact props:
     * - props.link: link-szerű (aláhúzott)
     * - props.text: szöveg-csak (nincs háttér)
     * - props.outlined: keretezett (border csak)
     * (egyéb): solid (kitöltött háttér)
     * 
     * A severity-k:
     * - undefined/null: primary (sötét kék #242943)
     * - "secondary": світліj kék #50ADC9
     * - "success": zöld
     * - "warning": sárga
     * - "danger": piros
     */
    let variantCls = "";

    /**
     * LINK variant: egyszerű aláhúzott link
     * - Átlátszó háttér
     * - Aláhúzás, 4px offset
     * - Hover: nincs aláhúzás
     */
    if (props.link) {
      variantCls = "bg-transparent underline underline-offset-4 text-sze-primary hover:no-underline";
    } 
    /**
     * TEXT variant: csak szöveg, egyed háttér hover-kor
     * 
     * Severity-k szerint:
     * - secondary: kék szöveg, kék-halványított háttér hover-kor
     * - success: zöld szöveg, zöld háttér hover-kor
     * - warning: narancssárga szöveg, narancssárga háttér hover-kor
     * - danger: piros szöveg, piros háttér hover-kor
     * - default: sötét kék szöveg, sötét kék halványított háttér hover-kor
     * 
     * Hover effect: -translate-y-0.5 (fél pixel felfelé mozgás)
     */
    else if (props.text) {
      variantCls = classNames(
        props.severity === "secondary" ? "text-sze-secondary hover:bg-sze-secondary/10 hover:-translate-y-0.5"
      : props.severity === "success"   ? "text-success hover:bg-success/10 hover:-translate-y-0.5"
      : props.severity === "warning"   ? "text-warning hover:bg-warning/10 hover:-translate-y-0.5"
      : props.severity === "danger"    ? "text-danger hover:bg-danger/10 hover:-translate-y-0.5"
                                       : "text-sze-primary hover:bg-sze-primary/10 hover:-translate-y-0.5"
      );
    } 
    /**
     * OUTLINED variant: keretített gomb (border, nincs kitöltés)
     * 
     * Severity-k szerint:
     * - secondary: kék keret és szöveg, kék-halványított háttér hover-kor
     * - success: zöld keret és szöveg, zöld háttér hover-kor
     * - warning: narancssárga keret, sötétebb narancssárga hover-kor (bg-warning/80)
     * - danger: piros keret és szöveg, piros háttér hover-kor
     * - default: sötét kék keret, sötét kék kitöltés hover-kor + fehér szöveg + árnyék
     * 
     * Hover effect: -translate-y-0.5 (fél pixel felfelé mozgás)
     */
    else if (props.outlined) {
      variantCls = classNames(
        props.severity === "secondary" ? "border border-sze-secondary text-sze-secondary hover:bg-sze-secondary/10 hover:-translate-y-0.5"
      : props.severity === "success"   ? "border border-success text-success hover:bg-success/10 hover:-translate-y-0.5"
      : props.severity === "warning"   ? "border border-warning text-warning hover:bg-warning/80 hover:-translate-y-0.5"
      : props.severity === "danger"    ? "border border-danger text-danger hover:bg-danger/10 hover:-translate-y-0.5"
                                       : "border border-sze-primary text-sze-primary hover:bg-sze-primary hover:text-white hover:-translate-y-0.5 shadow-sm hover:"
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
     * 
     * Hover effect: -translate-y-0.5 (fél pixel felfelé mozgás, press effect)
     */
    else {
      variantCls = classNames(
        props.severity === "secondary" ? "bg-sze-secondary text-white hover:opacity-90 hover:-translate-y-0.5"
      : props.severity === "success"   ? "bg-success text-white hover:opacity-90 hover:-translate-y-0.5"
      : props.severity === "warning"   ? "bg-warning text-black hover:opacity-90 hover:-translate-y-0.5"
      : props.severity === "danger"    ? "bg-danger text-white hover:opacity-90 hover:-translate-y-0.5"
                                       : "bg-sze-primary text-white hover:bg-sze-primary-900 hover:-translate-y-0.5"
      );
    }

    /**
     * Végső osztályok kombinálása
     * - base1: alapstílusok
     * - sizeCls: méretváltozat
     * - variantCls: variant + severity
     */
    return { className: classNames(...base1, sizeCls, variantCls) };
  },

  /**
   * label: a gomb szövegének stílusa
   * - truncate: túl hosszú szöveg esetén "..." pontokkal csonkított
   */
  label: { className: "truncate" },

  /**
   * icon: az ikon stílusa
   * - flex items-center justify-center: az ikon centrálása
   * - Ha jobbra van az ikon (iconPos === "right"): order-2 (jobbra kerül), ml-2 (bal margó)
   * - Ha balra (default): mr-2 (jobb margó)
   */
  icon: ({ props }) => ({ className: classNames("items-center ml-2") }),

  /**
   * loadingIcon: a loading spinner stílusa
   * - animate-spin: Tailwind beépített spinner animáció (360° forgás)
   */
  loadingIcon: { className: "animate-spin" },
};
