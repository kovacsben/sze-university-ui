import { Checkbox } from "sze-ui";

export default function Pelda() {
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="inline-flex items-center gap-2">
        <Checkbox />
        <span>Fogadok el</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <Checkbox />
        <span>Marketing e-mailek</span>
      </label>
    </div>
  );
}
