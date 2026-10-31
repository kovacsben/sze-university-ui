import { useState } from "react";
import { Button, Dialog } from "sze-ui";

export default function Pelda() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button label="Dialog Megnyitása" onClick={() => setVisible(true)} />
      <Dialog
        header="Biztosan folytatod?"
        visible={visible}
        radius="3xl"
        style={{ width: "30rem" }}
        onHide={() => setVisible(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button label="Mégse" outlined onClick={() => setVisible(false)} />
            <Button label="OK" onClick={() => setVisible(false)} />
          </div>
        }
      >
        <p>Ez egy modal párbeszéd komponens.</p>
      </Dialog>
    </div>
  );
}
