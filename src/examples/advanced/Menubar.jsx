import { useState } from "react";
import { Menubar } from "sze-ui";

const menu = [
  { label: "Kezdőlap", icon: "pi pi-home" },
  {
    label: "Egyetem",
    icon: "pi pi-building",
    items: [
      { label: "Rólunk", icon: "pi pi-info-circle" },
      { label: "Karok", icon: "pi pi-sitemap" },
      { label: "Vezetés", icon: "pi pi-users" },
      { separator: true },
      { label: "Kapcsolat", icon: "pi pi-envelope" },
    ],
  },
  {
    label: "Képzések",
    icon: "pi pi-book",
    items: [
      { label: "Alapképzések", icon: "pi pi-book" },
      { label: "Mesterképzések", icon: "pi pi-bookmark" },
      { label: "Doktori képzés", icon: "pi pi-star" },
    ],
  },
  {
    label: "Fiókom",
    icon: "pi pi-user",
    items: [
      { label: "Profil", icon: "pi pi-id-card" },
      { label: "Beállítások", icon: "pi pi-cog" },
      { separator: true },
      { label: "Kijelentkezés", icon: "pi pi-sign-out" },
    ],
  },
];

export default function Pelda() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      <Menubar model={menu} logoText="Széchenyi Egyetem" onItemClick={(item) => setSelected(item.label)} />
      <p className="text-sm text-gray-500">Kiválasztva: {selected ?? "–"}</p>
    </div>
  );
}
