import { Menu } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-6">
      {/* Popup Menu */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Popup Menü</h4>
        <Menu
          popup
          label="Széchenyi Menü"
          icon="pi pi-bars"
          severity="primary"
          items={[
            { label: "🏫 Egyetem", icon: "pi pi-building", command: () => console.log("Egyetem") },
            { label: "📚 Képzések", icon: "pi pi-book", command: () => console.log("Képzések") },
            { label: "🔬 Kutatás", icon: "pi pi-search", command: () => console.log("Kutatás") },
            { separator: true },
            { label: "👥 Kapcsolat", icon: "pi pi-phone", command: () => console.log("Kapcsolat") },
            { label: "📋 Jelentkezés", icon: "pi pi-file", command: () => console.log("Jelentkezés") },
          ]}
        />
      </div>

      {/* Multiple Menu Buttons */}
      <div className="flex flex-wrap gap-3">
        <Menu
          popup
          label="Intézet"
          icon="pi pi-building"
          severity="secondary"
          items={[
            { label: "Műszaki Intézet", command: () => console.log("Műszaki") },
            { label: "Gazdasági Intézet", command: () => console.log("Gazdasági") },
            { label: "Jogi Intézet", command: () => console.log("Jogi") },
          ]}
        />
        <Menu
          popup
          label="Adminisztráció"
          icon="pi pi-cog"
          severity="primary"
          items={[
            { label: "Profil Beállítások", icon: "pi pi-user", command: () => console.log("Profil") },
            { label: "Jogosultságok", icon: "pi pi-lock", command: () => console.log("Jogosultságok") },
            { separator: true },
            { label: "Kijelentkezés", icon: "pi pi-sign-out", command: () => console.log("Kijelentkezés") },
          ]}
        />
        <Menu
          popup
          label="Segítség"
          icon="pi pi-question-circle"
          severity="info"
          items={[
            { label: "Rólunk", command: () => console.log("Rólunk") },
            { label: "GYIK", command: () => console.log("GYIK") },
            { label: "Támogatás", command: () => console.log("Támogatás") },
          ]}
        />
      </div>

      {/* Menu with Danger Severity */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Veszélyes Műveletek</h4>
        <Menu
          popup
          label="Műveletek"
          icon="pi pi-exclamation-triangle"
          severity="danger"
          items={[
            { label: "Adatok Exportálása", icon: "pi pi-download", command: () => console.log("Export") },
            { label: "Mentés Biztonsági Mentése", icon: "pi pi-save", command: () => console.log("Mentés") },
            { separator: true },
            { label: "Törlés", icon: "pi pi-trash", command: () => console.log("Törlés") },
          ]}
        />
      </div>
    </div>
  );
}
