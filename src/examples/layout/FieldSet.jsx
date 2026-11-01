import { useState } from "react";
import { Calendar, Checkbox, Dropdown, FieldSet, InputText, RadioButton } from "sze-ui";
import { SZE_KAROK } from "../adatok";

const karok = SZE_KAROK.map((kar) => ({ label: kar.nev, value: kar.rovid }));

const kepzesiFormak = [
  { value: "nappali", label: "Nappali" },
  { value: "levelezo", label: "Levelező" },
  { value: "tavoktatas", label: "Távoktatás" },
];

// Címke + mező egy oszlopban
function Mezo({ id, label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Pelda() {
  const [szuletes, setSzuletes] = useState(null);
  const [kar, setKar] = useState(null);
  const [forma, setForma] = useState("nappali");

  return (
    <div className="space-y-5">
      <FieldSet legend="Személyes adatok">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Mezo id="vezeteknev" label="Vezetéknév">
            <InputText id="vezeteknev" placeholder="Kovács" />
          </Mezo>
          <Mezo id="keresztnev" label="Keresztnév">
            <InputText id="keresztnev" placeholder="Anna" />
          </Mezo>
          <Mezo id="szuletes" label="Születési dátum">
            <Calendar
              inputId="szuletes"
              value={szuletes}
              onChange={(e) => setSzuletes(e.value)}
              dateFormat="yy.mm.dd."
              placeholder="éééé.hh.nn."
              showIcon
              fullWidth
            />
          </Mezo>
          <Mezo id="anyja" label="Anyja neve">
            <InputText id="anyja" placeholder="Nagy Mária" />
          </Mezo>
        </div>
      </FieldSet>

      <FieldSet legend="Tanulmányi adatok">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Mezo id="neptun" label="Neptun-kód">
            <InputText id="neptun" placeholder="ABC123" maxLength={6} />
          </Mezo>
          <Mezo id="kar" label="Kar">
            <Dropdown
              inputId="kar"
              value={kar}
              onChange={(e) => setKar(e.value)}
              options={karok}
              placeholder="Válassz kart"
              className="w-full"
            />
          </Mezo>
          <fieldset className="md:col-span-2">
            <legend className="mb-2 text-sm font-medium text-gray-700">Képzési forma</legend>
            <div className="flex flex-wrap gap-5">
              {kepzesiFormak.map((f) => (
                <label key={f.value} className="inline-flex items-center gap-2 text-gray-700">
                  <RadioButton
                    name="kepzesi-forma"
                    value={f.value}
                    checked={forma === f.value}
                    onChange={(e) => setForma(e.value)}
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </FieldSet>

      <FieldSet legend="Elérhetőség">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Mezo id="email" label="E-mail">
            <InputText id="email" type="email" placeholder="kovacs.anna@example.hu" />
          </Mezo>
          <Mezo id="telefon" label="Telefon">
            <InputText id="telefon" type="tel" placeholder="+36 30 123 4567" />
          </Mezo>
          <Mezo id="irsz" label="Irányítószám és város">
            <div className="flex gap-2">
              <div className="w-28 shrink-0">
                <InputText id="irsz" placeholder="9026" maxLength={4} />
              </div>
              <InputText aria-label="Város" placeholder="Győr" />
            </div>
          </Mezo>
          <Mezo id="utca" label="Utca, házszám">
            <InputText id="utca" placeholder="Egyetem tér 1." />
          </Mezo>
        </div>
      </FieldSet>

      <FieldSet legend="Értesítések" toggleable>
        <div className="flex flex-col items-start gap-3">
          <label className="inline-flex items-center gap-2">
            <Checkbox defaultChecked />
            <span className="text-gray-700">E-mail értesítés a vizsgaeredményekről</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <Checkbox />
            <span className="text-gray-700">Hírlevél feliratkozás</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <Checkbox />
            <span className="text-gray-700">Nyilvános hallgatói profil</span>
          </label>
        </div>
      </FieldSet>
    </div>
  );
}
