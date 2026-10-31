import { Listbox } from "sze-ui";

const cities = [
  { name: "Győr", code: "GYO" },
  { name: "Budapest", code: "BUD" },
  { name: "Pécs", code: "PEC" },
];

export default function Pelda() {
  return <Listbox options={cities} optionLabel="name" placeholder="Város kiválasztása" className="w-full max-w-sm" />;
}
