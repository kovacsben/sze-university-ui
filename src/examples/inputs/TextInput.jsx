import { InputText } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-2 max-w-lg">
      <InputText placeholder="Sima szöveg input" radius="3xl" size="normal" className="w-full" />
      <InputText
        placeholder="Határozatlan"
        invalid
        radius="3xl"
        size="normal"
        className="w-full ring-red-600 focus-visible:ring-1 focus-visible:ring-red-600"
      />
    </div>
  );
}
