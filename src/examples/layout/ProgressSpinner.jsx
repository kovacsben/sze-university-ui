import { ProgressSpinner } from "sze-ui";

export default function Pelda() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-12 py-6">
      <ProgressSpinner size="sm" />
      <ProgressSpinner size="md" />
      <ProgressSpinner size="lg" strokeWidth={3} showLabel label="Betöltés..." />
    </div>
  );
}
