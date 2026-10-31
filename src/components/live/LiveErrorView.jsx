import formatError from "./formatError";

/**
 * Magyar nyelvű hibadoboz az előnézet helyén: cím, hely (sor/oszlop),
 * lefordított üzenet, a hibás sor környezete és az eredeti üzenet.
 * role="alert": a képernyőolvasó azonnal felolvassa.
 */
export default function LiveErrorView({ error, code }) {
  const { title, location, message, original, frame } = formatError(error, code);

  return (
    <div role="alert" className="rounded-lg border border-danger bg-red-50 p-4 text-sm text-red-900">
      <p className="font-semibold">
        <i className="pi pi-exclamation-triangle mr-2" aria-hidden="true"></i>
        {title}
        {location && <span className="font-normal"> – {location}</span>}
      </p>
      <p className="mt-1">{message}</p>

      {frame && (
        <pre className="mt-3 overflow-x-auto rounded-md bg-white/70 p-2 font-mono text-xs leading-5">
          {frame.map(({ n, text, current }) => (
            <div key={n} className={current ? "bg-red-100 font-semibold" : "text-red-900/70"}>
              <span className="inline-block w-8 select-none pr-2 text-right" aria-hidden="true">
                {current ? ">" : ""}
                {n}
              </span>
              {text || " "}
            </div>
          ))}
        </pre>
      )}

      {original && (
        <details className="mt-2 text-xs text-red-900/80">
          <summary className="cursor-pointer">Eredeti hibaüzenet</summary>
          <code className="mt-1 block font-mono">{original}</code>
        </details>
      )}
    </div>
  );
}
