// src/sze-ui/components/MultiSelect/MultiSelect.jsx
import { useState } from "react";
import { MultiSelect as PMultiSelect } from "primereact/multiselect";

/**
 * SZE MultiSelect wrapper.
 *
 * Kontrollált használat (`value` + `onChange`) esetén a PrimeReact viselkedés
 * változatlan. Ha nincs `value` prop, a komponens saját állapotot vezet
 * (`defaultValue`-ból indulva), így a `<MultiSelect options={...} />`
 * önmagában, extra state nélkül is használható.
 *
 * A panel fejlécében lévő "összes kijelölése" jelölőnégyzet alapból kap
 * feliratot, különben csak egy magában álló négyzet látszik.
 */
export default function MultiSelect({ value, defaultValue = [], onChange, className, ...props }) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;

  const handleChange = (e) => {
    if (!isControlled) setUncontrolled(e.value);
    onChange?.(e);
  };

  return (
    <PMultiSelect
      selectAllLabel="Összes kijelölése"
      {...props}
      value={isControlled ? value : uncontrolled}
      onChange={handleChange}
      className={className}
    />
  );
}
