import React from "react";
import { compile } from "../components/live/compile";
import ExampleErrorBoundary from "../components/live/ExampleErrorBoundary";
import LiveErrorView from "../components/live/LiveErrorView";
import { CHANNEL, postToParent } from "../components/live/previewProtocol";

/**
 * Az iframe-előnézet tartalma: fogadja a szülőtől érkező kódot, lefordítja és
 * rendereli; hibánál a magyar hibadobozt mutatja, és jelzi az állapotot a
 * szülőnek (annak aria-live régiójához).
 */
export default function PreviewApp() {
  const [state, setState] = React.useState({ code: "", Component: null, error: null, version: 0 });

  React.useEffect(() => {
    const onMessage = (event) => {
      if (event.source !== window.parent || event.origin !== window.location.origin) return;
      const msg = event.data;
      if (msg?.channel !== CHANNEL || msg.type !== "render") return;

      try {
        const Component = compile(msg.code);
        setState((s) => ({ code: msg.code, Component, error: null, version: s.version + 1 }));
        postToParent({ type: "status", ok: true });
      } catch (error) {
        setState((s) => ({ code: msg.code, Component: null, error, version: s.version + 1 }));
        postToParent({ type: "status", ok: false, message: error.message });
      }
    };
    window.addEventListener("message", onMessage);
    postToParent({ type: "ready" });
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const { code, Component, error, version } = state;

  if (error) return <LiveErrorView error={error} code={code} />;
  if (!Component) return null;

  return (
    <ExampleErrorBoundary
      resetKey={version}
      code={code}
      onError={(err) => postToParent({ type: "status", ok: false, message: err?.message })}
    >
      {/* A kulcs miatt minden új kód tiszta állapottal mountol. */}
      <Component key={version} />
    </ExampleErrorBoundary>
  );
}
