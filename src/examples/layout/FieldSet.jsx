import { Checkbox, FieldSet, InputText } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-4">
      {/* Basic FieldSet */}
      <FieldSet legend="Alapvető Információk">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Intézmény Neve
            </label>
            <InputText 
              placeholder="Széchenyi István Egyetem" 
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Város
            </label>
            <InputText 
              placeholder="Győr" 
              className="w-full"
            />
          </div>
        </div>
      </FieldSet>

      {/* FieldSet with Multiple Fields */}
      <FieldSet legend="Kapcsolat Adatok">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <InputText 
              placeholder="contact@sze.hu" 
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <InputText 
              placeholder="+36 96 613 000" 
              className="w-full"
            />
          </div>
        </div>
      </FieldSet>

      {/* Toggleable FieldSet */}
      <FieldSet legend="Haladó Beállítások" toggleable>
        <div className="flex flex-col items-start gap-3">
          <label className="inline-flex items-center gap-2">
            <Checkbox />
            <span className="text-gray-700">Nyilvános profil</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <Checkbox />
            <span className="text-gray-700">Hírlevél feliratkozás</span>
          </label>
        </div>
      </FieldSet>
    </div>
  );
}
