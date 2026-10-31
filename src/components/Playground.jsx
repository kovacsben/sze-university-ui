import React from "react";
import { SelectButton } from "../sze-ui";
import CodeBlock from "./CodeBlock";
import ExampleErrorBoundary from "./live/ExampleErrorBoundary";
import LiveInline from "./live/LiveInline";
import PreviewFrame from "./live/PreviewFrame";
import { VIEWPORTS } from "./live/previewProtocol";
import { applyControls, defaultValues } from "./live/applyControls";

// A CodeMirror csak a "Kód szerkesztése" első megnyitásakor töltődik le.
const LiveEditor = React.lazy(() => import("./live/LiveEditor"));

/** Élő frissítés késleltetése gépelés közben (ms). */
const DEBOUNCE_MS = 300;

/**
 * Kártyánkénti szerkesztések megőrzése fülváltáskor: a fülek lustán
 * mountolódnak, így a Playground állapota váltáskor elveszne. Modulszintű,
 * tehát oldalújratöltéskor (szándékosan) kiürül.
 */
const EDITS = new Map();

const TOOL_BUTTON =
  "shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-sze-primary-200 text-sze-primary hover:bg-sze-primary-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sze-secondary";

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Tartalék nem biztonságos (http) környezethez vagy tiltott Clipboard API-hoz.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.className = "fixed -left-[9999px]";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/**
 * Playground - élő, szerkeszthető bemutató kártya (Tailwind Play mintára).
 *
 * Egyetlen igazságforrás: a példa egy .jsx fájl (src/examples/<fül>/<Név>.jsx).
 * A `Component` a Vite által fordított modul, a `code` ugyanennek a fájlnak a
 * szövege (?raw). Szerkesztéskor ez a szöveg módosul, és ezt fordítjuk újra.
 *
 * Mi renderel (a teljesítmény miatt rétegezve):
 * - eredeti kód          -> az előre lefordított `Component`, inline (nincs futásidejű fordítás);
 * - csak vezérlő írta át -> LiveInline (lusta sucrase), inline;
 * - kézi szerkesztés vagy nyitott szerkesztő -> iframe-előnézet (PreviewFrame),
 *   mert itt új Tailwind-osztályok is lehetnek (lásd src/preview/main.jsx).
 *
 * Ez a komponens csak a bemutató (demo) alkalmazás része - NEM exportálódik
 * a src/sze-ui publikus könyvtár-barrelből.
 */
export default function Playground(props) {
  // Nagybetűs változóként bontjuk ki (nem paraméterként), mert az ESLint
  // no-unused-vars szabálya JSX-használatot csak így ismer fel.
  const { id, title, description, code: original, Component, controls } = props;
  const hasControls = Array.isArray(controls) && controls.length > 0;

  const saved = EDITS.get(id);
  const [values, setValues] = React.useState(() => saved?.values ?? defaultValues(controls));
  const [code, setCode] = React.useState(() => saved?.code ?? original); // az alkalmazott kód
  const [draft, setDraft] = React.useState(code); // a szerkesztő tartalma (debounce előtt)
  const [editing, setEditing] = React.useState(false);
  const [viewport, setViewport] = React.useState("fill");
  const [copied, setCopied] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");
  // Külső (nem gépelésből származó) kódcserénél - visszaállítás, vezérlő - a
  // szerkesztőt újramountoljuk. A @uiw/react-codemirror ugyanis gépelés után egy
  // időzítőig visszatartja a kívülről érkező value-frissítést, és ez a
  // böngésző időzítő-korlátozása miatt jóval tovább is tarthat, mint 200 ms.
  const [editorKey, setEditorKey] = React.useState(0);
  const lastStatusOk = React.useRef(true);

  const uid = React.useId();
  const panelId = `${uid}-panel`;
  const hintId = `${uid}-hint`;

  // Gépelés közben 300 ms-onként frissítünk, nem minden billentyűre.
  React.useEffect(() => {
    if (draft === code) return;
    const timer = setTimeout(() => setCode(draft), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [draft, code]);

  React.useEffect(() => {
    if (code === original) EDITS.delete(id);
    else EDITS.set(id, { code, values });
  }, [id, code, values, original]);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const template = hasControls ? applyControls(original, controls, values) : original;
  const isOriginal = code === original && draft === original;
  // Kézi szerkesztés: a kód eltér attól, amit a vezérlők az eredetiből generálnának.
  const isModified = draft !== template;

  const changeControl = (prop, value) => {
    const next = { ...values, [prop]: value };
    // A legfrissebb szövegből indulunk (a még le nem futott debounce-ot is
    // beleértve), így a vezérlő a kézi módosításokat nem írja felül.
    const nextCode = applyControls(draft, controls, next);
    setValues(next);
    setDraft(nextCode);
    setCode(nextCode);
    setEditorKey((k) => k + 1);
  };

  const reset = () => {
    setValues(defaultValues(controls));
    setDraft(original);
    setCode(original);
    setEditorKey((k) => k + 1);
    setAnnouncement("Visszaállítva az eredeti kódra.");
  };

  const copy = async () => {
    const ok = await copyToClipboard(draft);
    setCopied(ok);
    setAnnouncement(ok ? "Kód a vágólapra másolva." : "A másolás nem sikerült.");
  };

  // Az iframe hibáit/helyreállását a képernyőolvasónak is jelezzük (változáskor).
  const onPreviewStatus = React.useCallback((status) => {
    if (status.ok === lastStatusOk.current) return;
    lastStatusOk.current = status.ok;
    setAnnouncement(status.ok ? "Az előnézet ismét hibátlan." : "Hiba az előnézetben.");
  }, []);

  let preview;
  if (editing || (code !== template && !isOriginal)) {
    preview = (
      <PreviewFrame
        code={code}
        title={title}
        viewport={editing ? viewport : "fill"}
        minHeight={editing ? 360 : 120}
        onStatus={onPreviewStatus}
      />
    );
  } else if (code === original) {
    preview = (
      <ExampleErrorBoundary resetKey={code} code={code}>
        <Component />
      </ExampleErrorBoundary>
    );
  } else {
    preview = <LiveInline code={code} fallback={Component} />;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-sze-primary mb-1">
            {title}
            {isModified && (
              <span className="ml-2 align-middle rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                módosítva
              </span>
            )}
          </h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {!isOriginal && (
            <button type="button" onClick={reset} className={TOOL_BUTTON}>
              <i className="pi pi-replay mr-1" aria-hidden="true"></i>
              Visszaállítás
            </button>
          )}
          <button type="button" onClick={copy} className={TOOL_BUTTON}>
            <i className={`pi ${copied ? "pi-check" : "pi-copy"} mr-1`} aria-hidden="true"></i>
            {copied ? "Másolva!" : "Kód másolása"}
          </button>
          <button
            type="button"
            onClick={() => setEditing((e) => !e)}
            aria-expanded={editing}
            aria-controls={panelId}
            className={TOOL_BUTTON}
          >
            <i className={`pi ${editing ? "pi-times" : "pi-code"} mr-1`} aria-hidden="true"></i>
            {editing ? "Szerkesztő bezárása" : "Kód szerkesztése"}
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {hasControls && (
        <div className="flex flex-wrap gap-4 mt-4 pb-4 border-b border-gray-100">
          {controls.map((c) => (
            <div key={c.prop} className="flex flex-col gap-1">
              <span id={`${uid}-${c.prop}`} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {c.label}
              </span>
              <SelectButton
                options={c.options}
                value={values[c.prop]}
                aria-labelledby={`${uid}-${c.prop}`}
                onChange={(e) => {
                  if (e.value != null) changeControl(c.prop, e.value);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {editing ? (
        <div
          id={panelId}
          className={
            VIEWPORTS.find((v) => v.value === viewport)?.stacked
              ? "mt-4 grid grid-cols-1 gap-4"
              : "mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2"
          }
        >
          <div className="min-w-0 space-y-2">
            <React.Suspense fallback={<CodeBlock code={draft} />}>
              <LiveEditor
                key={editorKey}
                value={draft}
                onChange={setDraft}
                label={`${title} – JSX-kódszerkesztő`}
                describedBy={hintId}
              />
            </React.Suspense>
            <p id={hintId} className="text-xs text-gray-500">
              A módosítás {DEBOUNCE_MS} ms után megjelenik az előnézetben. Tab: behúzás · Esc, majd Tab: kilépés a
              szerkesztőből. Elérhető importok: react, sze-ui, ../adatok.
            </p>
          </div>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span id={`${uid}-viewport`} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Előnézet szélessége
              </span>
              <SelectButton
                options={VIEWPORTS}
                optionLabel="label"
                optionValue="value"
                value={viewport}
                aria-labelledby={`${uid}-viewport`}
                onChange={(e) => {
                  if (e.value != null) setViewport(e.value);
                }}
              />
            </div>
            {preview}
          </div>
        </div>
      ) : (
        <div className="space-y-3 mt-4">{preview}</div>
      )}
    </div>
  );
}
