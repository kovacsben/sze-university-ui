import { useState } from "react";
import { TimePicker } from "sze-ui";

export default function Pelda() {
  const [time, setTime] = useState(null);

  return (
    <TimePicker
      value={time}
      onChange={(value) => setTime(value)}
      timeOnly
      hourFormat="24"
      placeholder="Válassz időt"
    />
  );
}
