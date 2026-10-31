import React from "react";

/**
 * SZE FieldSet - form mezők csoportosítása.
 *
 * A natív `<legend>` NEM egy teljes szélességű fejlécsáv: zsugorodik a
 * tartalmához, és a `<fieldset>` felső keretére ülve megszakítja azt.
 * A korábbi kód mégis fejlécsávként stílusozta (gradiens háttér +
 * `border-b`), ezért a keret tetején lógó, alul odavont vonallal kísért
 * dobozként jelent meg. Itt a legend a szerepének megfelelően, a keretre ülő
 * címkeként van formázva - a fejlécsávos elrendezésre a Panel komponens való.
 *
 * @param {string} legend - A csoport címkéje
 * @param {JSX.Element|string} children - A csoport tartalma
 * @param {boolean} collapsed - Kezdetben összecsukott állapot (default: false)
 * @param {boolean} toggleable - Össze-/kinyitható-e a csoport (default: false)
 * @param {string} className - További CSS osztályok a fieldsetre
 * @param {string} legendClassName - További CSS osztályok a legendre
 */
export default function FieldSet({
  legend,
  children,
  collapsed = false,
  toggleable = false,
  className,
  legendClassName,
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const labelClasses = "text-sm font-semibold text-sze-primary";

  return (
    <fieldset
      className={[
        "rounded-lg border border-sze-primary-200 bg-white px-5",
        // Összecsukva a keret szorosan a címke sorára záródik, hogy ne
        // maradjon alatta üres sáv. A legend mindkét állapotban a keret
        // tetején ül, ezért a címke nem ugrik el váltáskor.
        isCollapsed ? "pt-0 pb-1" : "pt-2 pb-5",
        className || "",
      ].join(" ").trim()}
    >
      {legend && (
        // A ml-1 elhúzza a címkét a lekerekített saroktól, a px-2 pedig
        // levegőt hagy a keret megszakadásánál.
        <legend className={`ml-1 px-2 ${legendClassName || ""}`.trim()}>
          {toggleable ? (
            // Valódi <button>: a korábbi onClick a <legend>-en nem volt
            // fókuszálható, és billentyűzetről sem lehetett használni.
            <button
              type="button"
              aria-expanded={!isCollapsed}
              onClick={() => setIsCollapsed((c) => !c)}
              className={[
                "inline-flex items-center gap-2 rounded-md px-1 py-0.5",
                labelClasses,
                "cursor-pointer transition-colors hover:text-sze-primary-700",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary",
              ].join(" ")}
            >
              {legend}
              {/* Egyetlen ikon forgatva: a korábbi megoldás két külön ikon
                  között váltott, így a transition-transform sosem futott le. */}
              <i
                className={`pi pi-chevron-down text-xs transition-transform duration-200 ${
                  isCollapsed ? "-rotate-90" : ""
                }`}
                aria-hidden="true"
              />
            </button>
          ) : (
            <span className={`px-1 ${labelClasses}`}>{legend}</span>
          )}
        </legend>
      )}

      {!isCollapsed && <div className="pt-1">{children}</div>}
    </fieldset>
  );
}
