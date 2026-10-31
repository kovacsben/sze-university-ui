import { Menubar } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-6">
      {/* Main Menubar */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Széchenyi Egyetem Menubar</h4>
        <Menubar
          items={[
            {
              label: "Kezdőlap",
              icon: "pi pi-home",
              command: () => console.log("Kezdőlap"),
            },
            {
              label: "Oktatás",
              icon: "pi pi-book",
              items: [
                { label: "Alapképzések", command: () => console.log("Alapképzések") },
                { label: "Mesterképzések", command: () => console.log("Mesterképzések") },
              ],
            },
            {
              label: "Beállítások",
              icon: "pi pi-cog",
              items: [
                { label: "Profil", command: () => console.log("Profil") },
                { label: "Kijelentkezés", command: () => console.log("Kijelentkezés") },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
