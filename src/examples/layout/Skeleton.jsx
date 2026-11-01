import { useEffect, useState } from "react";
import { Avatar, Button, Card, Chip, Skeleton } from "sze-ui";

export default function Pelda() {
  const [tolt, setTolt] = useState(true);

  // Szimulált betöltés: 2 másodperc után megjelenik a valódi tartalom.
  useEffect(() => {
    if (!tolt) return;
    const id = setTimeout(() => setTolt(false), 2000);
    return () => clearTimeout(id);
  }, [tolt]);

  return (
    <div className="space-y-4">
      <div className="max-w-md" aria-busy={tolt}>
        {tolt ? (
          <Card>
            <div className="flex items-center gap-3">
              <Skeleton shape="circle" size="3rem" />
              <div className="flex-1 space-y-2">
                <Skeleton width="60%" height="1rem" />
                <Skeleton width="40%" height="0.75rem" />
              </div>
            </div>
            <Skeleton count={3} height="0.75rem" className="mt-5" />
            <Skeleton width="6rem" height="1.75rem" borderRadius="9999px" className="mt-5" />
          </Card>
        ) : (
          <Card>
            <div className="flex items-center gap-3">
              <Avatar label="KA" size="large" />
              <div>
                <p className="font-semibold text-sze-primary">Kovács Anna</p>
                <p className="text-xs text-gray-500">Mérnökinformatikus BSc · 3. félév</p>
              </div>
            </div>
            <p className="mt-4">
              A hallgatói profil betöltődött. Amíg az adatok úton vannak, a Skeleton ugyanazt az
              elrendezést mutatja, így a tartalom megjelenésekor nem ugrál az oldal.
            </p>
            <div className="mt-4">
              <Chip label="Aktív hallgató" icon="pi pi-check" severity="success" />
            </div>
          </Card>
        )}
      </div>

      <Button label="Újratöltés" icon="pi pi-refresh" variant="outline" disabled={tolt} onClick={() => setTolt(true)} />
    </div>
  );
}
