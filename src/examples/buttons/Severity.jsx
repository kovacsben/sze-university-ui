import { Button } from "sze-ui";

export default function Pelda() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button label="Info" />
      <Button label="Siker" severity="success" />
      <Button label="Figyelem" severity="warning" />
      <Button label="Hiba" severity="danger" />
    </div>
  );
}
