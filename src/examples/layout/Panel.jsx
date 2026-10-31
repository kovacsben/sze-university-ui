import { Panel } from "sze-ui";

export default function Pelda() {
  return (
    <Panel header="Panel Fejléc" toggleable>
      <p className="text-gray-700">Ez a panel tartalma. Kiterjeszthető és összecsukható.</p>
    </Panel>
  );
}
