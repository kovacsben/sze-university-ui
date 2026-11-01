import { useState } from "react";
import { Megamenu } from "sze-ui";

// Felső szint > oszlopok > menüpontok
const menu = [
  {
    label: "Felvételizőknek",
    icon: "pi pi-user-plus",
    items: [
      {
        label: "Képzési szintek",
        items: [
          { label: "Alapképzés (BSc, BA)", icon: "pi pi-book" },
          { label: "Mesterképzés (MSc, MA)", icon: "pi pi-bookmark" },
          { label: "Osztatlan képzés", icon: "pi pi-clone" },
          { label: "Doktori képzés (PhD)", icon: "pi pi-star" },
        ],
      },
      {
        label: "Jelentkezés",
        items: [
          { label: "Felvételi tájékoztató", icon: "pi pi-info-circle" },
          { label: "Pontszámítás", icon: "pi pi-calculator" },
          { label: "Nyílt nap", icon: "pi pi-calendar" },
          { separator: true },
          { label: "Ösztöndíjak", icon: "pi pi-wallet" },
        ],
      },
      {
        label: "Nemzetközi",
        items: [
          { label: "Erasmus+", icon: "pi pi-globe" },
          { label: "Külföldi hallgatóknak", icon: "pi pi-flag" },
          { label: "Nyári egyetem", icon: "pi pi-sun" },
        ],
      },
    ],
  },
  {
    label: "Karok",
    icon: "pi pi-building",
    items: [
      {
        label: "Mérnöki karok",
        items: [
          { label: "Audi Hungaria Járműmérnöki Kar", icon: "pi pi-car" },
          { label: "Gépészmérnöki, Informatikai és Villamosmérnöki Kar", icon: "pi pi-microchip" },
          { label: "Építész-, Építő- és Közlekedésmérnöki Kar", icon: "pi pi-building-columns" },
        ],
      },
      {
        label: "Gazdaság és jog",
        items: [
          { label: "Kautz Gyula Gazdaságtudományi Kar", icon: "pi pi-chart-line" },
          { label: "Deák Ferenc Állam- és Jogtudományi Kar", icon: "pi pi-briefcase" },
        ],
      },
      {
        label: "Humán, egészség, művészet",
        items: [
          { label: "Apáczai Csere János Kar", icon: "pi pi-users" },
          { label: "Egészség- és Sporttudományi Kar", icon: "pi pi-heart" },
          { label: "Művészeti Kar", icon: "pi pi-palette" },
        ],
      },
    ],
  },
  {
    label: "Kutatás",
    icon: "pi pi-search",
    items: [
      {
        label: "Kutatás",
        items: [
          { label: "Kutatócsoportok", icon: "pi pi-sitemap" },
          { label: "Laboratóriumok", icon: "pi pi-cog" },
          { label: "Publikációk", icon: "pi pi-file" },
        ],
      },
      {
        label: "Együttműködés",
        items: [
          { label: "Ipari partnerek", icon: "pi pi-link" },
          { label: "Pályázatok", icon: "pi pi-euro" },
          { label: "Technológiatranszfer", icon: "pi pi-arrow-right-arrow-left" },
        ],
      },
    ],
  },
  {
    label: "Hallgatóknak",
    icon: "pi pi-graduation-cap",
    items: [
      {
        label: "Tanulmányok",
        items: [
          { label: "Neptun", icon: "pi pi-desktop" },
          { label: "Órarend", icon: "pi pi-clock" },
          { label: "Vizsgaidőszak", icon: "pi pi-check-square" },
          { label: "Szakdolgozat", icon: "pi pi-pen-to-square" },
        ],
      },
      {
        label: "Szolgáltatások",
        items: [
          { label: "Könyvtár", icon: "pi pi-book" },
          { label: "Kollégium", icon: "pi pi-home" },
          { label: "Sport", icon: "pi pi-bolt" },
          { label: "Karrieriroda", icon: "pi pi-briefcase" },
        ],
      },
    ],
  },
  { label: "Kapcsolat", icon: "pi pi-envelope" },
];

export default function Pelda() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      <Megamenu model={menu} onItemClick={(item) => setSelected(item.label)} />
      <p className="text-sm text-gray-500">Kiválasztva: {selected ?? "–"}</p>
    </div>
  );
}
