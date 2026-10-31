import { useState } from "react";
import { RadioButton } from "sze-ui";

export default function Pelda() {
  const [value, setValue] = useState("a");

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="inline-flex items-center gap-2">
        <RadioButton inputId="opt1" name="options" value="a" onChange={(e) => setValue(e.value)} checked={value === "a"} />
        <span>Opció A</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <RadioButton inputId="opt2" name="options" value="b" onChange={(e) => setValue(e.value)} checked={value === "b"} />
        <span>Opció B</span>
      </label>
    </div>
  );
}
