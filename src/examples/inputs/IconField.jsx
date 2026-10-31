import { IconField, InputIcon, InputText } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-2 max-w-lg gap-3">
      <IconField>
        <InputIcon icon="pi pi-search" position="right" />
        <InputText placeholder="Keresés…" className="w-full" />
      </IconField>
      <IconField>
        <InputText placeholder="Email" className="w-full" />
        <InputIcon icon="pi pi-envelope" position="right" />
      </IconField>
    </div>
  );
}
