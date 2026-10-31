import { useState } from "react";
import { Button, ConfirmPopUp } from "sze-ui";

export default function Pelda() {
  // Melyik buborék van nyitva: "info" | "warning" | "success" | null
  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen((current) => (current === id ? null : id));
  const close = () => setOpen(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-center pt-12 pb-12 bg-gray-50 rounded-lg relative">
        <Button label="Info PopUp" onClick={() => toggle("info")} />
        {open === "info" && (
          <ConfirmPopUp
            visible
            message="Szeretnéd megtekinteni az információimat?"
            icon="pi pi-info-circle"
            severity="info"
            confirmLabel="Igen"
            cancelLabel="Mégse"
            position="bottom"
            onConfirm={() => {
              console.log("Info PopUp megerősítve");
              close();
            }}
            onCancel={close}
          />
        )}
      </div>

      <div className="flex justify-center pt-12 pb-12 bg-gray-50 rounded-lg relative">
        <Button label="Figyelem PopUp" severity="warning" onClick={() => toggle("warning")} />
        {open === "warning" && (
          <ConfirmPopUp
            visible
            message="Ez megváltoztat néhány beállítást. Folytatod?"
            icon="pi pi-exclamation-triangle"
            severity="warning"
            confirmLabel="Igen, továbbmegyek"
            cancelLabel="Mégsem"
            position="top"
            onConfirm={() => {
              console.log("Warning PopUp megerősítve");
              close();
            }}
            onCancel={close}
          />
        )}
      </div>

      <div className="flex justify-center pt-12 pb-12 bg-gray-50 rounded-lg relative">
        <Button label="Sikeres PopUp" severity="success" onClick={() => toggle("success")} />
        {open === "success" && (
          <ConfirmPopUp
            visible
            message="Az intézmény sikeresen mentve."
            icon="pi pi-check"
            severity="success"
            confirmLabel="OK"
            cancelLabel="Bezár"
            position="bottom"
            onConfirm={() => {
              console.log("Success PopUp megerősítve");
              close();
            }}
            onCancel={close}
          />
        )}
      </div>
    </div>
  );
}
