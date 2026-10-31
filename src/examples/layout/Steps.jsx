import { useState } from "react";
import { Steps } from "sze-ui";

export default function Pelda() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Steps
      items={[{ label: "Szállítás" }, { label: "Fizetés" }, { label: "Megerősítés" }, { label: "Kész" }]}
      activeIndex={activeIndex}
      onSelect={setActiveIndex}
    />
  );
}
