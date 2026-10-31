import { FloatLabel, InputText } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-3">
      <FloatLabel label="Név">
        <InputText placeholder=" " className="w-72" />
      </FloatLabel>
      <FloatLabel label="Email">
        <InputText placeholder=" " className="w-72" />
      </FloatLabel>
    </div>
  );
}
