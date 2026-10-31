import { TieredMenu } from "sze-ui";

export default function Pelda() {
  return (
    <TieredMenu
      items={[
        {
          label: "Fájl",
          icon: "pi pi-fw pi-file",
          items: [
            { label: "Új", icon: "pi pi-fw pi-plus" },
            { label: "Megnyitás", icon: "pi pi-fw pi-external-link" },
            { label: "Mentés", icon: "pi pi-fw pi-save" }
          ]
        },
        {
          label: "Szerkesztés",
          icon: "pi pi-fw pi-pencil",
          items: [
            { label: "Másolás", icon: "pi pi-fw pi-copy" },
            { label: "Törlés", icon: "pi pi-fw pi-trash" }
          ]
        },
        {
          label: "Nézet",
          icon: "pi pi-fw pi-eye"
        }
      ]}
    />
  );
}
