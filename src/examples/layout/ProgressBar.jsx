import { useEffect, useState } from "react";
import { Button, InputNumber, InputSwitch, ProgressBar } from "sze-ui";

export default function Pelda() {
  const [ertek, setErtek] = useState(45);
  const [lepes, setLepes] = useState(5);
  const [intervallum, setIntervallum] = useState(300);
  const [fut, setFut] = useState(false);
  const [animalt, setAnimalt] = useState(true);

  // Futás közben "intervallum" ms-onként "lepes" %-ot lép; 100%-nál megáll.
  useEffect(() => {
    if (!fut) return;
    const id = setInterval(() => setErtek((v) => Math.min(100, v + lepes)), Math.max(50, intervallum));
    return () => clearInterval(id);
  }, [fut, lepes, intervallum]);

  useEffect(() => {
    if (ertek >= 100) setFut(false);
  }, [ertek]);

  const inditas = () => {
    if (ertek >= 100) setErtek(0);
    setFut((f) => !f);
  };

  return (
    <div className="space-y-6">
      <ProgressBar value={ertek} animated={animalt} size="lg" label="Feltöltés" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Érték (%)
          <InputNumber value={ertek} onValueChange={(e) => setErtek(e.value ?? 0)} min={0} max={100} suffix=" %" fullWidth />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Lépés (%)
          <InputNumber value={lepes} onValueChange={(e) => setLepes(e.value ?? 1)} min={1} max={50} suffix=" %" fullWidth />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Intervallum (ms)
          <InputNumber value={intervallum} onValueChange={(e) => setIntervallum(e.value ?? 300)} min={50} max={5000} step={50} suffix=" ms" fullWidth />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button label={fut ? "Szünet" : "Indítás"} icon={fut ? "pi pi-pause" : "pi pi-play"} onClick={inditas} />
        <Button label="Visszaállítás" icon="pi pi-refresh" variant="outline" onClick={() => { setFut(false); setErtek(0); }} />
        <label className="ml-auto inline-flex items-center gap-2 text-sm text-gray-700">
          <InputSwitch checked={animalt} onChange={(e) => setAnimalt(e.value)} />
          Animált csíkok
        </label>
      </div>
    </div>
  );
}
