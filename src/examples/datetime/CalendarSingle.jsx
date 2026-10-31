import { useState } from "react";
import { Calendar } from "sze-ui";

export default function Pelda() {
  const [date, setDate] = useState(null);

  return (
    <Calendar
      value={date}
      onChange={(e) => setDate(e.value)}
      showIcon
      placeholder="Válassz dátumot"
      inline
    />
  );
}
