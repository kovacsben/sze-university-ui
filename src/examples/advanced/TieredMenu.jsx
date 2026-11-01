import { useState } from "react";
import { TieredMenu } from "sze-ui";

const menu = [
  {
    label: "Fájl",
    icon: "pi pi-file",
    items: [
      {
        label: "Új",
        icon: "pi pi-plus",
        items: [
          { label: "Dokumentum", icon: "pi pi-file-edit" },
          { label: "Táblázat", icon: "pi pi-table" },
        ],
      },
      { label: "Megnyitás", icon: "pi pi-folder-open" },
      { label: "Mentés", icon: "pi pi-save" },
      { separator: true },
      {
        label: "Exportálás",
        icon: "pi pi-download",
        items: [
          { label: "PDF", icon: "pi pi-file-pdf" },
          { label: "Word", icon: "pi pi-file-word" },
        ],
      },
    ],
  },
  {
    label: "Szerkesztés",
    icon: "pi pi-pencil",
    items: [
      { label: "Másolás", icon: "pi pi-copy" },
      { label: "Törlés", icon: "pi pi-trash" },
    ],
  },
  { label: "Nézet", icon: "pi pi-eye" },
  { separator: true },
  { label: "Súgó", icon: "pi pi-question-circle" },
];

export default function Pelda() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      <TieredMenu model={menu} onItemClick={(item) => setSelected(item.label)} />
      <p className="text-sm text-gray-500">Kiválasztva: {selected ?? "–"}</p>
    </div>
  );
}
