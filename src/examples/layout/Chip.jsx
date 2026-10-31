import { useState } from "react";
import { Chip } from "sze-ui";

export default function Pelda() {
  const [chips, setChips] = useState([
    { id: 1, label: "React", severity: "primary" },
    { id: 2, label: "JavaScript", severity: "secondary" },
    { id: 3, label: "Tailwind", severity: "success" },
    { id: 4, label: "PrimeReact", severity: "warning" },
  ]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-sze-primary mb-2">Alapszintű Chipek</h4>
          <div className="flex flex-wrap gap-2">
            <Chip label="React" icon="pi pi-star" severity="primary" radius="full" />
            <Chip label="JavaScript" severity="secondary" radius="full" />
            <Chip label="Tailwind CSS" severity="success" radius="full" />
            <Chip label="UI Library" severity="warning" radius="full" />
            <Chip label="Component" severity="danger" radius="full" />
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sze-primary mb-2">Eltávolítható Chipek</h4>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip
                key={chip.id}
                label={chip.label}
                severity={chip.severity}
                radius="full"
                closable
                onClose={() => setChips(chips.filter(c => c.id !== chip.id))}
              />
            ))}
          </div>
          {chips.length === 0 && (
            <p className="text-gray-500 text-sm">Nincs chip. Kattintsd meg az X gombot az eltávolításához!</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-sze-primary mb-2">Ikones Chipek</h4>
          <div className="flex flex-wrap gap-2">
            <Chip label="Felhasználó" icon="pi pi-user" severity="primary" radius="full" />
            <Chip label="Beállítások" icon="pi pi-cog" severity="secondary" radius="full" />
            <Chip label="Sikeres" icon="pi pi-check" severity="success" radius="full" />
            <Chip label="Figyelem" icon="pi pi-exclamation-triangle" severity="warning" radius="full" />
            <Chip label="Hiba" icon="pi pi-times" severity="danger" radius="full" />
          </div>
        </div>
      </div>
    </div>
  );
}
