import { Button, Card, Chip } from "sze-ui";

export default function Pelda() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        eyebrow="Felvételi"
        title="Nyílt nap"
        subtitle="Ismerd meg a kampuszt"
        radius="2xl"
        shadow="md"
        footer={<Button label="Jelentkezem" size="small" fullWidth />}
      >
        <p>
          Laborlátogatás, kari bemutatók és beszélgetés a hallgatókkal - egy nap alatt
          kiderül, melyik szak illik hozzád.
        </p>
      </Card>

      <Card
        eyebrow="Hallgatóknak"
        title="Vizsgaidőszak"
        subtitle="Fontos határidők"
        radius="2xl"
        shadow="md"
        footer={
          <div className="flex gap-2 justify-end">
            <Button label="Később" variant="outline" size="small" />
            <Button label="Megnyitás" size="small" />
          </div>
        }
      >
        <p className="mb-3">A vizsgákra a Neptunban lehet jelentkezni - érdemes időben, mert a helyek gyorsan betelnek.</p>
        <p className="text-3xl font-bold text-sze-primary">
          12 <span className="text-sm font-medium text-gray-500">nap van hátra</span>
        </p>
      </Card>

      <Card
        eyebrow="Egyetem"
        title="Széchenyi István Egyetem"
        subtitle="Győr, Egyetem tér 1."
        radius="2xl"
        shadow="md"
      >
        <p className="mb-4">
          Sokkarú egyetem mérnöki, gazdasági, jogi, egészségügyi és művészeti képzésekkel.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Chip label="Oktatás" icon="pi pi-book" />
          <Chip label="Kutatás" icon="pi pi-search" severity="secondary" />
        </div>
      </Card>
    </div>
  );
}
