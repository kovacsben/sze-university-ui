import { useState } from "react";
import { InputNumber, KeyFilteredInput } from "sze-ui";

export default function Pelda() {
  const [num, setNum] = useState(10);

  return (
    <div className="space-y-2 max-w-lg">
      <KeyFilteredInput placeholder="Csak számok" keyfilter="int" className="w-full" />
      <InputNumber value={num} onValueChange={(e) => setNum(e.value)} showButtons className="w-full" />
    </div>
  );
}
