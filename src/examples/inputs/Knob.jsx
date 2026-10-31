import { useState } from "react";
import { Knob } from "sze-ui";

export default function Pelda() {
  const [value, setValue] = useState(10);

  return <Knob value={value} onChange={(e) => setValue(e.value)} min={0} max={100} />;
}
