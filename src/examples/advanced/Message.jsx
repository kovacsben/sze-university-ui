import { Message } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-4">
      {/* Info Message */}
      <Message
        severity="info"
        title="Információ"
        text="A Széchenyi István Egyetem Magyarország egyik legrangosabb műszaki egyeteme."
        radius="lg"
        closable
      />

      {/* Success Message */}
      <Message
        severity="success"
        title="Sikeres Operáció"
        text="A hallgató sikeresen regisztrálva lett a képzésre."
        icon="pi pi-check"
        radius="lg"
        closable
      />

      {/* Warning Message */}
      <Message
        severity="warning"
        title="Figyelmeztetés"
        text="Az adatmódosítások 24 óra múlva lépnek érvénybe."
        radius="lg"
        closable
      />

      {/* Error Message */}
      <Message
        severity="error"
        title="Hiba"
        text="Az alkalmazás feldolgozása sikertelen. Kérjük próbálja újra később."
        radius="lg"
        closable
      />
    </div>
  );
}
