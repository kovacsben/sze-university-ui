import { useState } from "react";
import { Slider } from "sze-ui";

export default function Pelda() {
  const [value, setValue] = useState(30);

  return <Slider value={value} onChange={(e) => setValue(e.value)} className="w-64" />;
}
