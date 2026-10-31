import { Megamenu } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-6">
      {/* Academic Megamenu - Abbreviated for space */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Széchenyi Egyetem Megamenu</h4>
        <Megamenu
          items={[
            {
              label: "🏫 Oktatás",
              icon: "pi pi-book",
              items: [
                {
                  label: "Alapképzések",
                  items: [
                    { label: "Informatika", command: () => console.log("Informatika") },
                    { label: "Mérnöki Tudományok", command: () => console.log("Mérnöki") },
                    { label: "Gazdaságtan", command: () => console.log("Gazdaságtan") },
                  ],
                },
                {
                  label: "Mesterképzések",
                  items: [
                    { label: "Mérnökinformatika", command: () => console.log("Mérnökinformatika") },
                    { label: "Üzletmenedzsment", command: () => console.log("Üzletmenedzsment") },
                  ],
                },
              ],
            },
            {
              label: "🔬 Kutatás",
              icon: "pi pi-search",
              items: [
                {
                  label: "Kutatási Intézetek",
                  items: [
                    { label: "Robotika Laboratorium", command: () => console.log("Robotika") },
                    { label: "AI és Gépi Tanulás", command: () => console.log("AI") },
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
