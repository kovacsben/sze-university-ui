import { useState } from "react";
import { AutoComplete } from "sze-ui";

const cities = ["Győr", "Budapest", "Pécs"];

export default function Pelda() {
  const [value, setValue] = useState("");
  const suggestions = cities.filter((n) => n.toLowerCase().includes((value || "").toLowerCase()));

  return (
    <AutoComplete
      value={value}
      suggestions={suggestions}
      onChange={(e) => setValue(e.value)}
      placeholder="Keresés…"
      className="w-full max-w-sm"
    />
  );
}
