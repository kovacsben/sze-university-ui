import { useState } from "react";
import { Checkbox as PCheckbox } from "primereact/checkbox";

/**
 * SZE Checkbox wrapper.
 *
 * Kontrollált használat (`checked` + `onChange`) esetén a PrimeReact
 * viselkedés változatlan. Ha nincs `checked` prop, a komponens saját
 * állapotot vezet (`defaultChecked`-ből indulva), így a `<Checkbox />`
 * önmagában, extra state nélkül is kapcsolható.
 */
export default function Checkbox({ checked, defaultChecked = false, onChange, ...props }) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isControlled = checked !== undefined;

  const handleChange = (e) => {
    if (!isControlled) setUncontrolled(e.checked);
    onChange?.(e);
  };

  return <PCheckbox {...props} checked={isControlled ? checked : uncontrolled} onChange={handleChange} />;
}
