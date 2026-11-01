import { Button, Chip, Panel } from "sze-ui";

const orak = [
  { ido: "08:00 – 09:30", targy: "Programozás alapjai", hely: "B-201" },
  { ido: "10:00 – 11:30", targy: "Diszkrét matematika", hely: "A-104" },
  { ido: "13:00 – 14:30", targy: "Webfejlesztés labor", hely: "C-012" },
];

export default function Pelda() {
  return (
    <div className="space-y-4">
      {/* A teljes fejléc kattintható - próbáld ki a csukást és a nyitást. */}
      <Panel header="Mai órarend">
        <ul className="divide-y divide-black/5">
          {orak.map((ora) => (
            <li key={ora.ido} className="flex items-center justify-between gap-4 py-2.5">
              <div>
                <p className="font-semibold text-sze-primary">{ora.targy}</p>
                <p className="text-xs text-gray-500 tabular-nums">{ora.ido}</p>
              </div>
              <Chip label={ora.hely} icon="pi pi-map-marker" severity="secondary" />
            </li>
          ))}
        </ul>
      </Panel>

      {/* collapsed: csukva indul */}
      <Panel
        header="Közlemények (2 új)"
        collapsed
        footer={
          <div className="flex justify-end">
            <Button label="Összes közlemény" variant="text" size="small" />
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sze-primary">Elindult a tárgyfelvételi időszak</p>
            <p>A tárgyakat a Neptunban lehet felvenni; a kurzusok létszáma korlátozott.</p>
          </div>
          <div>
            <p className="font-semibold text-sze-primary">Könyvtári nyitvatartás</p>
            <p>A vizsgaidőszakban a könyvtár hosszabbított nyitvatartással várja a hallgatókat.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
