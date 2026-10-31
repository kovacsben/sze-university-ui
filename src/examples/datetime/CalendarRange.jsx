import { useState } from "react";
import { Calendar } from "sze-ui";

export default function Pelda() {
  const [range, setRange] = useState(null);

  return (
    <Calendar
      value={range}
      onChange={(e) => setRange(e.value)}
      selectionMode="range"
      showIcon
      showButtonBar
      placeholder="Válassz időszakot"
    />
  );
}
