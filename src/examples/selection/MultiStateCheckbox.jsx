import { MultiStateCheckbox } from "sze-ui";

export default function Pelda() {
  return (
    <MultiStateCheckbox
      options={[
        { value: "elfogadva", icon: "pi pi-check" },
        { value: "elutasitva", icon: "pi pi-times" },
        { value: "folyamatban", icon: "pi pi-clock" },
      ]}
      optionValue="value"
    />
  );
}
