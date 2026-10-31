import React from "react";
import CodeBlock from "./CodeBlock";

/**
 * Playground - bemutató kártya a demo oldalhoz.
 *
 * A példa egyetlen .jsx fájl (src/examples/<fül>/<Név>.jsx): a `Component` a
 * Vite által fordított modul, a `code` ugyanennek a fájlnak a szövege (?raw).
 *
 * Ez a komponens csak a bemutató (demo) alkalmazás része - NEM exportálódik
 * a src/sze-ui publikus könyvtár-barrelből.
 */
export default function Playground(props) {
  // Nagybetűs változóként bontjuk ki (nem paraméterként), mert az ESLint
  // no-unused-vars szabálya JSX-használatot csak így ismer fel.
  const { title, description, code, Component } = props;
  const [showCode, setShowCode] = React.useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-sze-primary mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        <button
          type="button"
          onClick={() => setShowCode((s) => !s)}
          className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-sze-primary-200 text-sze-primary hover:bg-sze-primary-50 transition"
        >
          {showCode ? "Kód elrejtése" : "Kód megjelenítése"}
        </button>
      </div>

      <div className="space-y-3 mt-4">
        <Component />
      </div>

      {showCode && (
        <div className="mt-4">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
