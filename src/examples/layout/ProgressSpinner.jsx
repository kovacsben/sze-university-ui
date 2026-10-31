import { ProgressSpinner } from "sze-ui";

export default function Pelda() {
  return (
    <div className="flex justify-center py-8">
      <ProgressSpinner strokeWidth={2} showLabel={true} label="Betöltés..." />
    </div>
  );
}
