import { useState } from "react";
import { SelectButton } from "sze-ui";

export default function Pelda() {
  const [dayNight, setDayNight] = useState("Nappali");

  return (
    <SelectButton
      options={["Nappali", "Éjjeli"]}
      value={dayNight}
      onChange={(e) => e.value !== null && setDayNight(e.value)}
      className="w-full"
    />
  );
}
