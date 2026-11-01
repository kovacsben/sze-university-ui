import { useState } from "react";
import { TreeSelect } from "sze-ui";
import { SZE_FA } from "../adatok";

export default function Pelda() {
  const [szak, setSzak] = useState(null);
  // Az egyetem csomópontja nyitva indul, így a karok rögtön látszanak.
  const [expandedKeys, setExpandedKeys] = useState({ 0: true });

  return (
    <TreeSelect
      value={szak}
      onChange={(e) => setSzak(e.value)}
      options={SZE_FA}
      expandedKeys={expandedKeys}
      onToggle={(e) => setExpandedKeys(e.value)}
      placeholder="Válassz kart vagy szakot"
      className="w-full max-w-sm"
    />
  );
}
