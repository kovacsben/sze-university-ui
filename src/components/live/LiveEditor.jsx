import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";

/**
 * A JSX-kódszerkesztő (CodeMirror 6). Lusta chunkban van: csak a
 * "Kód szerkesztése" első megnyitásakor töltődik le.
 *
 * Akadálymentesség: a szerkesztő tartalma (role="textbox") kap akadálymentes
 * nevet és leírást. A Tab behúz, de nem csapdázza a fókuszt: a CodeMirror
 * beépített viselkedése szerint Esc után a következő Tab / Shift+Tab kilép a
 * szerkesztőből (ezt a látható tipp is elmondja).
 */
export default function LiveEditor({ value, onChange, label, describedBy }) {
  const extensions = React.useMemo(
    () => [
      javascript({ jsx: true }),
      EditorView.contentAttributes.of({ "aria-label": label, "aria-describedby": describedBy }),
    ],
    [label, describedBy]
  );

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      basicSetup={{ foldGutter: false }}
      minHeight="240px"
      maxHeight="600px"
      className="overflow-hidden rounded-lg border border-gray-200 text-sm"
    />
  );
}
