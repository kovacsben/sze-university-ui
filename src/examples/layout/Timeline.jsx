import { Timeline } from "sze-ui";

// Egy félév menete; a done: false események még hátravannak (halvány jelölő).
export default function Pelda() {
  return (
    <Timeline
      value={[
        { title: "Regisztráció", description: "Bejelentkezés a félévre és a tárgyak felvétele a Neptunban.", date: "1. hét", icon: "pi pi-user-plus" },
        { title: "Szorgalmi időszak", description: "Előadások, gyakorlatok és laborok.", date: "1–14. hét", icon: "pi pi-book" },
        { title: "Zárthelyi dolgozatok", description: "Évközi számonkérések a gyakorlati jegyekhez.", date: "7–13. hét", icon: "pi pi-pencil" },
        { title: "Vizsgaidőszak", description: "Vizsgajelentkezés és vizsgák.", date: "15–20. hét", icon: "pi pi-check-square", done: false },
        { title: "A félév lezárása", description: "Az eredmények rögzítése, a félév értékelése.", date: "21. hét", icon: "pi pi-flag", done: false },
      ]}
    />
  );
}
