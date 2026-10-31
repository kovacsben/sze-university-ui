import { useState } from "react";
import { Dropdown } from "sze-ui";

const cities = [
  { name: "Győr", code: "GYO" },
  { name: "Budapest", code: "BUD" },
  { name: "Pécs", code: "PEC" },
];

export default function Pelda() {
  const [city, setCity] = useState(null);

  return (
    <Dropdown
      value={city}
      onChange={(e) => setCity(e.value)}
      options={cities}
      optionLabel="name"
      placeholder="Válassz várost..."
      radius="xl"
      size="normal"
      className="w-full max-w-sm"
    />
  );
}
