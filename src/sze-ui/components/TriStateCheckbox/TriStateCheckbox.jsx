import { useState } from 'react';
import { TriStateCheckbox as PTriStateCheckbox } from 'primereact/tristatecheckbox';
import { tristatecheckbox } from '../../theme/pt/tristatecheckbox';

/**
 * SZE TriStateCheckbox wrapper.
 *
 * Kontrollált használat (`value` + `onChange`) esetén a viselkedés változatlan.
 * Ha nincs `value` prop, a komponens saját állapotot vezet (`defaultValue`-ból),
 * így a `<TriStateCheckbox />` önmagában is végigjárja a három állapotot.
 */
const TriStateCheckbox = ({
  value,
  defaultValue = null,
  onChange = null,
  className = '',
  label = '',
  ...props
}) => {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;

  const handleChange = (e) => {
    if (!isControlled) setUncontrolled(e.value);
    if (onChange) onChange(e.value);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <PTriStateCheckbox
        value={isControlled ? value : uncontrolled}
        onChange={handleChange}
        pt={tristatecheckbox}
        {...props}
      />
      {label && (
        <label className="text-sm text-gray-700 font-medium cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default TriStateCheckbox;
