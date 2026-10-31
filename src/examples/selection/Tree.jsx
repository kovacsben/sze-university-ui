import { useState } from "react";
import { Tree } from "sze-ui";
import { SZE_FA, expandableKeys } from "../adatok";

export default function Pelda() {
  // A fa nyitottan indul, hogy a karok és a szakok is látszódjanak.
  const [expandedKeys, setExpandedKeys] = useState(() => expandableKeys(SZE_FA));

  return <Tree value={SZE_FA} expandedKeys={expandedKeys} onToggle={(e) => setExpandedKeys(e.value)} />;
}
