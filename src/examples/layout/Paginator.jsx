import { useState } from "react";
import { Paginator } from "sze-ui";

export default function Pelda() {
  const [first, setFirst] = useState(0);
  // A lapméretet is állapotban tartjuk, különben a "sor/oldal" legördülő
  // kiválasztása nem csinálna semmit (a rows fix érték maradna).
  const [rows, setRows] = useState(10);

  return (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={100}
      rowsPerPageOptions={[5, 10, 20, 50]}
      onPageChange={(e) => {
        setFirst(e.first);
        setRows(e.rows);
      }}
    />
  );
}
