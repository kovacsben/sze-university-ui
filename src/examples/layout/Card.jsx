import { Button, Card } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          title="Alapszintű Card"
          subtitle="Fejléc és tartalom"
          radius="2xl"
          shadow="md"
        >
          <p className="text-gray-700">
            Ez egy egyszerű card komponens, amely közös tartalmak megjelenítésére szolgál.
          </p>
        </Card>

        <Card
          title="Card Footer-rel"
          subtitle="Fejléc, tartalom és lábléc"
          radius="2xl"
          shadow="md"
          footer={
            <div className="flex gap-2 justify-end">
              <Button label="Mégsem" variant="outline" size="small" />
              <Button label="OK" size="small" />
            </div>
          }
        >
          <p className="text-gray-700 mb-3">
            Ez a card tartalmaz egy lábléchez, amely gombokat vagy egyéb elemeket tartalmazhat.
          </p>
        </Card>
      </div>

      <Card
        title="Széchenyi István Egyetem"
        subtitle="Guido Estathé és Tudás Központja"
        radius="2xl"
        shadow="md"
      >
        <div className="space-y-3">
          <p className="text-gray-700">
            A Széchenyi István Egyetem (SZE) Magyarország egyik vezető felsőoktatási intézménye.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-sze-primary-100 text-sze-primary rounded-full text-sm">📚 Oktatás</span>
            <span className="px-3 py-1 bg-sze-secondary-100 text-sze-secondary rounded-full text-sm">🔬 Kutatás</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
