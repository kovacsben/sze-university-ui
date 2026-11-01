import { Fragment, useState } from "react";
import { Avatar, Button, Chip, Divider, ScrollPanel } from "sze-ui";

const ertesitesek = [
  { ikon: "pi pi-book", cim: "Új jegy: Programozás alapjai", szoveg: "A zárthelyi dolgozat eredménye felkerült a Neptunba.", cimke: "Tanulmányok", tipus: "primary", ido: "5 perce" },
  { ikon: "pi pi-calendar", cim: "Vizsgaidőpont módosult", szoveg: "A Diszkrét matematika vizsga új időpontja: jövő kedd 10:00.", cimke: "Vizsga", tipus: "warning", ido: "1 órája" },
  { ikon: "pi pi-wallet", cim: "Ösztöndíj kiutalva", szoveg: "A tanulmányi ösztöndíj e havi részlete átutalásra került.", cimke: "Pénzügy", tipus: "success", ido: "3 órája" },
  { ikon: "pi pi-megaphone", cim: "Kari közlemény", szoveg: "Csütörtökön szakmai nap lesz, az órák elmaradnak.", cimke: "Közlemény", tipus: "secondary", ido: "tegnap" },
  { ikon: "pi pi-envelope", cim: "Új üzenet az oktatótól", szoveg: "A beadandó határideje egy héttel meghosszabbodott.", cimke: "Üzenet", tipus: "primary", ido: "tegnap" },
  { ikon: "pi pi-exclamation-triangle", cim: "Hiányzó dokumentum", szoveg: "A szakmai gyakorlat igazolását még nem töltötted fel.", cimke: "Teendő", tipus: "danger", ido: "2 napja" },
  { ikon: "pi pi-book", cim: "Könyvtári kölcsönzés lejár", szoveg: "Két kikölcsönzött könyv határideje három nap múlva jár le.", cimke: "Könyvtár", tipus: "secondary", ido: "3 napja" },
];

export default function Pelda() {
  const [olvasott, setOlvasott] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-semibold text-sze-primary">Értesítések</h4>
        <Button
          label="Mind olvasott"
          icon="pi pi-check"
          variant="text"
          size="small"
          disabled={olvasott}
          onClick={() => setOlvasott(true)}
        />
      </div>

      <ScrollPanel height="320px">
        {ertesitesek.map((e, i) => (
          <Fragment key={e.cim}>
            {i > 0 && <Divider className="!my-3" />}
            <div className={`flex gap-3 ${olvasott ? "opacity-60" : ""}`}>
              <Avatar icon={e.ikon} size="normal" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sze-primary">{e.cim}</p>
                  <span className="shrink-0 text-xs text-gray-400">{e.ido}</span>
                </div>
                <p className="mt-0.5 text-sm text-gray-600">{e.szoveg}</p>
                <div className="mt-2">
                  <Chip label={e.cimke} severity={e.tipus} />
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </ScrollPanel>
    </div>
  );
}
