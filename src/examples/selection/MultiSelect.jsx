import { MultiSelect } from "sze-ui";

const options = [{ name: "Győr" }, { name: "Pécs" }, { name: "Budapest" }];

export default function Pelda() {
  return (
    <MultiSelect
      options={options}
      optionLabel="name"
      placeholder="Városok kiválasztása..."
      className="w-full max-w-sm"
    />
  );
}
