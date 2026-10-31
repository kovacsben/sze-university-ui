import { useState } from "react";
import { Inplace } from "sze-ui";

export default function Pelda() {
  const [inplaceValue, setInplaceValue] = useState("Széchenyi István Egyetem");
  const [inplaceDescription, setInplaceDescription] = useState("Győr, Magyarország");

  return (
    <div className="space-y-6">
      {/* Basic Inplace */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Intézmény Neve</h4>
        <Inplace
          value={inplaceValue}
          onChange={setInplaceValue}
          onSave={(val) => {
            setInplaceValue(val);
            console.log("Mentve:", val);
          }}
          placeholder="Szerkesztéshez kattintson"
          label="Intézmény"
        />
      </div>

      {/* Inplace Description */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Helyszín/Város</h4>
        <Inplace
          value={inplaceDescription}
          onChange={setInplaceDescription}
          onSave={(val) => {
            setInplaceDescription(val);
            console.log("Helyszín mentve:", val);
          }}
          placeholder="Kattintson szerkesztéshez"
          label="Helyszín"
        />
      </div>
    </div>
  );
}
