import React from "react";
import { SelectButton } from "../sze-ui";
import CodeBlock from "./CodeBlock";

/**
 * Playground - bemutató kártya a demo oldalhoz (App.jsx).
 *
 * Két üzemmódban működik:
 * - Statikus (controls/render nélkül): a `children`-t rendereli, pontosan úgy,
 *   mint a régi ComponentCard. Ha `code` string meg van adva, "Kód megjelenítése"
 *   gombot is kap.
 * - Interaktív (`controls` + `render` megadva): a `controls`-ban leírt propokat
 *   élőben szerkeszthetővé teszi (pl. lekerekítés SM->XL), a `render(values)`
 *   azonnal újrarajzolja a komponenst, a `code(values)` pedig a kódnézetet
 *   szinkronban tartja a vezérlőkkel.
 *
 * Ez a komponens csak a bemutató (demo) alkalmazás része - NEM exportálódik
 * a src/sze-ui publikus könyvtár-barrelből.
 */
export default function Playground({ title, description, controls, render, code, children }) {
  const [values, setValues] = React.useState(() => {
    const initial = {};
    (controls || []).forEach((c) => {
      initial[c.prop] = c.default;
    });
    return initial;
  });
  const [showCode, setShowCode] = React.useState(false);

  const update = (prop, val) => setValues((v) => ({ ...v, [prop]: val }));

  const hasControls = Array.isArray(controls) && controls.length > 0 && typeof render === "function";
  const codeString = typeof code === "function" ? code(values) : typeof code === "string" ? code : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-sze-primary mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        {codeString && (
          <button
            type="button"
            onClick={() => setShowCode((s) => !s)}
            className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-sze-primary-200 text-sze-primary hover:bg-sze-primary-50 transition"
          >
            {showCode ? "Kód elrejtése" : "Kód megjelenítése"}
          </button>
        )}
      </div>

      {hasControls && (
        <div className="flex flex-wrap gap-4 mt-4 pb-4 border-b border-gray-100">
          {controls.map((c) => (
            <div key={c.prop} className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {c.label}
              </label>
              <SelectButton
                options={c.options}
                value={values[c.prop]}
                onChange={(e) => {
                  if (e.value != null) update(c.prop, e.value);
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 mt-4">{hasControls ? render(values) : children}</div>

      {showCode && codeString && (
        <div className="mt-4">
          <CodeBlock code={codeString} />
        </div>
      )}
    </div>
  );
}
