import { Toolbar } from "sze-ui";

export default function Pelda() {
  return (
    <Toolbar
      items={[
        { icon: "pi pi-home", label: "Otthon", title: "Kezdőoldal" },
        { separator: true },
        { icon: "pi pi-file", label: "Új", title: "Új dokumentum" },
        { icon: "pi pi-folder-open", label: "Megnyitás", title: "Fájl megnyitása" },
        { icon: "pi pi-save", label: "Mentés", title: "Dokumentum mentése" },
        { separator: true },
        { icon: "pi pi-print", label: "Nyomtatás", severity: "info", title: "Nyomtatás" },
      ]}
    />
  );
}
