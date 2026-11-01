import { useState } from "react";
import { TimePicker } from "sze-ui";

export default function Pelda() {
  const [time, setTime] = useState(null);

  return (
    <div className="flex flex-col gap-2">
      <TimePicker
        value={time}
        onChange={(value) => setTime(value)}
        hourFormat="24"
        placeholder="Válassz időt"
        className="max-w-sm"
      />
      <p className="text-sm text-gray-500">Kiválasztott idő: {time ?? "–"}</p>
    </div>
  );
}
