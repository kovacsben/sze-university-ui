import { useRef } from "react";
import { Button, Toast } from "sze-ui";

export default function Pelda() {
  // A Toast-ot a ref-en keresztül, imperatívan hívjuk: toast.current.show(...)
  const toast = useRef(null);

  const show = (severity, summary, detail) => toast.current?.show({ severity, summary, detail, life: 3000 });

  return (
    <div>
      <Toast ref={toast} />
      <div className="flex gap-2">
        <Button label="Info Toast" onClick={() => show("info", "Információ", "Ez egy információs értesítés.")} />
        <Button
          label="Siker Toast"
          severity="success"
          onClick={() => show("success", "Siker", "A mentés sikeresen megtörtént.")}
        />
        <Button
          label="Figyelem Toast"
          severity="warning"
          onClick={() => show("warn", "Figyelem", "Ellenőrizd a megadott adatokat!")}
        />
      </div>
    </div>
  );
}
