import React from "react";
import { CHANNEL, PREVIEW_URL, VIEWPORTS } from "./previewProtocol";

/**
 * Az élő előnézet iframe-je (a tartalom a preview.html-ben fut, lásd
 * src/preview/main.jsx). A kódot postMessage-dzsel küldi át, a magasságot az
 * iframe jelzi vissza, így nincs belső görgetősáv.
 */

const MAX_HEIGHT = 2000;

export default function PreviewFrame({ code, title, viewport = "fill", minHeight = 360, onStatus }) {
  const iframeRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [height, setHeight] = React.useState(minHeight);

  // A callbacket refben tartjuk, hogy az üzenetfigyelőt ne kelljen újrakötni.
  const onStatusRef = React.useRef(onStatus);
  React.useEffect(() => {
    onStatusRef.current = onStatus;
  });

  React.useEffect(() => {
    const onMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow || event.origin !== window.location.origin) return;
      const msg = event.data;
      if (msg?.channel !== CHANNEL) return;
      if (msg.type === "ready") setReady(true);
      else if (msg.type === "height") setHeight(Math.min(MAX_HEIGHT, Math.max(minHeight, msg.value)));
      else if (msg.type === "status") onStatusRef.current?.(msg);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [minHeight]);

  React.useEffect(() => {
    if (!ready) return;
    iframeRef.current?.contentWindow?.postMessage({ channel: CHANNEL, type: "render", code }, window.location.origin);
  }, [ready, code]);

  const widthClass = (VIEWPORTS.find((v) => v.value === viewport) || VIEWPORTS[0]).className;

  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 bg-white">
      {!ready && (
        <p role="status" className="absolute inset-x-0 top-6 text-center text-sm text-gray-500">
          Előnézet betöltése…
        </p>
      )}
      <iframe
        ref={iframeRef}
        src={PREVIEW_URL}
        title={`Élő előnézet: ${title}`}
        className={`mx-auto block max-w-none border-0 ${widthClass}`}
        style={{ height }}
      />
    </div>
  );
}
