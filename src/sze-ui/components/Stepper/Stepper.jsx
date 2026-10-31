/**
 * SZE Stepper - többlépéses folyamat állapotjelzője.
 *
 * Korábbi hibák, amiket ez a változat javít:
 * - A `steps` elemek `label` mezője SEHOL nem jelent meg, csak a sorszám -
 *   a demó "Lépés 1/2/3" feliratai láthatatlanok voltak.
 * - Az alapértelmezett `orientation` "vertical" volt, a csatlakozó vonal
 *   viszont vízszintesre volt megírva (`flex-1 h-1`), így a kettő egymásnak
 *   ellentmondott: függőleges oszlop vízszintes vonaldarabokkal.
 * - A lépések sima `<div onClick>` elemek voltak: egérrel működtek, de
 *   billentyűzetről elérhetetlenek voltak. Most `<button>`-ök.
 *
 * @param {{label?: string}[]} steps - A lépések listája
 * @param {number} activeStep - Az aktuális lépés indexe
 * @param {(index:number)=>void} onStepChange - Callback lépésváltáskor
 * @param {"horizontal"|"vertical"} orientation - Elrendezés (default: horizontal)
 * @param {string} className - További CSS osztályok
 */
export default function Stepper({
  steps = [],
  activeStep = 0,
  onStepChange = null,
  orientation = "horizontal",
  className = "",
  style = {},
}) {
  const horizontal = orientation === "horizontal";

  const marker = (step, index) => {
    const done = index < activeStep;
    return (
      <button
        type="button"
        onClick={() => onStepChange?.(index)}
        aria-label={step.label ? `${index + 1}. lépés: ${step.label}` : `${index + 1}. lépés`}
        className={[
          "flex items-center justify-center w-10 h-10 shrink-0 rounded-full font-semibold",
          "cursor-pointer transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary focus-visible:ring-offset-2",
          index <= activeStep
            ? "bg-sze-primary text-white hover:bg-sze-primary-900"
            : "bg-gray-300 text-gray-700 hover:bg-gray-400",
        ].join(" ")}
      >
        {done ? <i className="pi pi-check" aria-hidden="true" /> : index + 1}
      </button>
    );
  };

  // A felirat - ez hiányzott korábban teljesen a renderből.
  const label = (step, index) =>
    step.label && (
      <span
        className={[
          "text-sm",
          horizontal ? "text-center whitespace-nowrap" : "",
          index === activeStep ? "font-semibold text-sze-primary" : "text-gray-600",
        ].join(" ")}
      >
        {step.label}
      </span>
    );

  const connector = (index) => (
    <div
      className={[
        "rounded",
        index < activeStep ? "bg-sze-primary" : "bg-gray-300",
        horizontal
          ? // A korong függőleges közepéhez igazítva (40px korong fele - vonal fele).
            "flex-1 h-1 mx-2 mt-[1.125rem]"
          : // A korong vízszintes közepéhez igazítva.
            "w-1 h-6 my-1 ml-[1.125rem]",
      ].join(" ")}
      aria-hidden="true"
    />
  );

  return (
    <ol
      className={[
        "stepper-wrapper flex list-none p-0 m-0",
        horizontal ? "items-start" : "flex-col",
        className,
      ].join(" ").trim()}
      style={style}
    >
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        const current = index === activeStep;

        return horizontal ? (
          // Vízszintes: [jelölő + felirat egymás alatt] — vonal — [következő]
          <li
            key={index}
            aria-current={current ? "step" : undefined}
            className={`flex items-start ${last ? "flex-none" : "flex-1"}`}
          >
            <div className="flex flex-col items-center gap-2">
              {marker(step, index)}
              {label(step, index)}
            </div>
            {!last && connector(index)}
          </li>
        ) : (
          // Függőleges: [jelölő + felirat egymás mellett], alatta a vonal
          <li key={index} aria-current={current ? "step" : undefined} className="flex flex-col">
            <div className="flex items-center gap-3">
              {marker(step, index)}
              {label(step, index)}
            </div>
            {!last && connector(index)}
          </li>
        );
      })}
    </ol>
  );
}
