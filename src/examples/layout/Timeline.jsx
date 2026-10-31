import { Timeline } from "sze-ui";

export default function Pelda() {
  return (
    <Timeline
      value={[
        { title: "Projekt Kezdés", description: "Az projekt indítása", date: "2024.01.01", icon: "pi pi-check" },
        { title: "Design Fázis", description: "UI/UX tervezés", date: "2024.02.01", icon: "pi pi-pencil" },
        { title: "Fejlesztés", description: "Kódolás és implementáció", date: "2024.03.01", icon: "pi pi-code" },
        { title: "Testing", description: "QA és tesztelés", date: "2024.04.01", icon: "pi pi-check-circle" }
      ]}
    />
  );
}
