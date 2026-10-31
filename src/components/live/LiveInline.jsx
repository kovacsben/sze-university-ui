import React from "react";
import ExampleErrorBoundary from "./ExampleErrorBoundary";
import LiveErrorView from "./LiveErrorView";

/**
 * Vezérlővel átírt példakód futtatása a főoldalon (iframe nélkül).
 *
 * Ilyenkor csak a vezérelt propok literáljai változnak (pl. radius="lg"), ezek
 * osztályai a build-CSS-ben benne vannak, ezért nem kell az iframe-es Tailwind.
 * A fordító (compile.js -> sucrase) itt töltődik be először, dinamikus
 * importtal. Amíg az új változat fordul, az előző látszik, így nincs villanás.
 */
export default function LiveInline({ code, fallback }) {
  const [state, setState] = React.useState({ Component: fallback, error: null, code: null, version: 0 });

  React.useEffect(() => {
    let cancelled = false;
    import("./compile").then(({ compile }) => {
      if (cancelled) return;
      try {
        const Component = compile(code);
        setState((s) => ({ Component, error: null, code, version: s.version + 1 }));
      } catch (error) {
        setState((s) => ({ ...s, error, code, version: s.version + 1 }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (state.error) return <LiveErrorView error={state.error} code={state.code} />;

  const { Component } = state;
  return (
    <ExampleErrorBoundary resetKey={state.version} code={state.code}>
      <Component key={state.version} />
    </ExampleErrorBoundary>
  );
}
