import { useState } from "react";
import { Button, ConfirmDialog } from "sze-ui";

export default function Pelda() {
  // Melyik dialógus van nyitva: "info" | "warning" | "danger" | null
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);

  return (
    <div className="space-y-3">
      <div>
        <Button label="Info Megerősítés" onClick={() => setOpen("info")} />
        <ConfirmDialog
          visible={open === "info"}
          title="Információ"
          message="Ez egy információs megerősítési dialógus az SZE komponenssel."
          icon="pi pi-info-circle"
          severity="info"
          confirmLabel="Értem"
          cancelLabel="Bezárás"
          onConfirm={() => {
            console.log("Info megerősítve");
            close();
          }}
          onCancel={close}
        />
      </div>

      <div>
        <Button label="Figyelem - Megerősítés" variant="secondary" onClick={() => setOpen("warning")} />
        <ConfirmDialog
          visible={open === "warning"}
          title="Figyelem"
          message="Biztos vagy a műveletben? Ez nem vonható vissza közvetlenül."
          icon="pi pi-exclamation-triangle"
          severity="warning"
          confirmLabel="Igen, folytatom"
          cancelLabel="Mégse"
          onConfirm={() => {
            console.log("Figyelmeztetés megerősítve");
            close();
          }}
          onCancel={close}
        />
      </div>

      <div>
        <Button label="Veszélyes Művelet" severity="danger" onClick={() => setOpen("danger")} />
        <ConfirmDialog
          visible={open === "danger"}
          title="Vigyázat - Veszélyes Művelet"
          message="Ez a művelet véglegesen törli az adatokat. Tényleg folytatni szeretnéd?"
          icon="pi pi-exclamation-circle"
          severity="danger"
          confirmLabel="Igen, törlés"
          cancelLabel="Nem, mégse"
          onConfirm={() => {
            console.log("Veszélyes művelet megerősítve");
            close();
          }}
          onCancel={close}
        />
      </div>
    </div>
  );
}
