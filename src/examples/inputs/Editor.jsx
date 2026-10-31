import { useState } from "react";
import { Button, Editor } from "sze-ui";

export default function Pelda() {
  const [html, setHtml] = useState("<p>Kezdő szöveg</p>");

  return (
    <div className="space-y-3">
      <Editor value={html} onChange={(e) => setHtml(e)} style={{ height: "320px" }} />
      <div className="flex gap-2">
        <Button label="Mentés" />
        <Button label="Előnézet" variant="outline" />
      </div>
      <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
        <strong>HTML Preview:</strong>
        <pre className="text-xs mt-2 overflow-x-auto">{html}</pre>
      </div>
    </div>
  );
}
