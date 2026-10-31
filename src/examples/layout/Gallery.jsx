import { Gallery } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-6">
      {/* Standard 3-column Gallery */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Széchenyi István Egyetem - Kampusz Képek</h4>
        <Gallery
          items={[
            {
              src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=300&fit=crop",
              title: "Campus Épület"
            },
            {
              src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
              title: "Tantermek"
            },
            {
              src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
              title: "Könyvtár"
            },
            {
              src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
              title: "Labor"
            },
          ]}
          columns={3}
          gap={4}
        />
      </div>
    </div>
  );
}
