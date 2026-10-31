import { Breadcrumb } from "sze-ui";

const items = [
  { label: "Kezdőoldal", icon: "pi pi-home", command: () => console.log("home") },
  { label: "Széchenyi István Egyetem", command: () => console.log("sze") },
  { label: "Mérnöki Kar", command: () => console.log("engineering") },
  { label: "Informatika", command: () => console.log("it") },
];

export default function Pelda() {
  return (
    <div className="space-y-4">
      <Breadcrumb items={items} />
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
        <p>A Breadcrumb komponens segít a felhasználóknak megérteni a hierarchikus navigációt.</p>
      </div>
    </div>
  );
}
