import { useState } from "react";
import { ToggleButton } from "sze-ui";

export default function Pelda() {
  const [toggle, setToggle] = useState(false);

  return (
    <ToggleButton
      checked={toggle}
      onChange={(e) => setToggle(e.value)}
      onLabel="Bekapcsolva"
      offLabel="Kikapcsolva"
    />
  );
}
