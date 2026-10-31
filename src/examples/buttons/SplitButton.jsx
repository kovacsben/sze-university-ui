import { SplitButton } from "sze-ui";

const items = [
  { label: "Szerkesztés", icon: "pi pi-pencil", command: () => console.log("edit") },
  { label: "Megosztás", icon: "pi pi-share-alt", command: () => console.log("share") },
  { separator: true },
  { label: "Törlés", icon: "pi pi-trash", command: () => console.log("delete") },
];

export default function Pelda() {
  return (
    <div className="flex flex-wrap gap-3">
      <SplitButton label="Műveletek" model={items} />
      <SplitButton label="Műveletek" severity="secondary" model={items} />
      <SplitButton label="Műveletek" severity="success" model={items} />
      <SplitButton label="Műveletek" severity="warning" model={items} />
    </div>
  );
}
