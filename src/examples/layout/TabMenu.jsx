import { useState } from "react";
import { TabMenu } from "sze-ui";

export default function Pelda() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabMenu
      items={[
        { label: "Otthon", icon: "pi pi-home" },
        { label: "Naptár", icon: "pi pi-calendar" },
        { label: "Szerkesztés", icon: "pi pi-pencil" },
      ]}
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    />
  );
}
