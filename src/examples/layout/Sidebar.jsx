import { useState } from "react";
import { Avatar, Button, Chip, Divider, Sidebar } from "sze-ui";

const menu = [
  { label: "Áttekintés", icon: "pi pi-home" },
  { label: "Órarend", icon: "pi pi-calendar" },
  { label: "Tárgyaim", icon: "pi pi-book" },
  { label: "Vizsgák", icon: "pi pi-check-square" },
  { label: "Pénzügyek", icon: "pi pi-wallet" },
];

export default function Pelda() {
  const [nyitva, setNyitva] = useState(false);
  // Bezáráskor is megtartjuk, hogy a panel ugyanarra az oldalra csússzon ki, ahonnan jött.
  const [oldal, setOldal] = useState("left");
  const megnyit = (o) => {
    setOldal(o);
    setNyitva(true);
  };
  const [aktiv, setAktiv] = useState("Áttekintés");

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button label="Megnyitás balról" icon="pi pi-arrow-right" onClick={() => megnyit("left")} />
        <Button label="Megnyitás jobbról" icon="pi pi-arrow-left" variant="outline" onClick={() => megnyit("right")} />
      </div>

      <Sidebar
        visible={nyitva}
        position={oldal}
        onHide={() => setNyitva(false)}
        title="Hallgatói portál"
        subtitle="Széchenyi István Egyetem"
        footer={<Button label="Kijelentkezés" icon="pi pi-sign-out" variant="outline" fullWidth />}
      >
        <div className="flex items-center gap-3">
          <Avatar label="KA" size="large" />
          <div className="min-w-0">
            <p className="font-semibold text-sze-primary">Kovács Anna</p>
            <p className="text-sm text-gray-500">Mérnökinformatikus BSc</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip label="Nappali" icon="pi pi-sun" severity="secondary" />
          <Chip label="3. félév" icon="pi pi-graduation-cap" />
        </div>

        <Divider />

        <nav aria-label="Hallgatói menü" className="flex flex-col gap-1">
          {menu.map((m) => (
            <Button
              key={m.label}
              label={m.label}
              icon={m.icon}
              variant={aktiv === m.label ? undefined : "text"}
              align="left"
              radius="xl"
              fullWidth
              aria-current={aktiv === m.label ? "page" : undefined}
              onClick={() => setAktiv(m.label)}
            />
          ))}
        </nav>
      </Sidebar>
    </>
  );
}
