import { useState } from 'react';
import { MultiStateCheckbox as PMultiStateCheckbox } from 'primereact/multistatecheckbox';
import { multistatecheckbox } from '../../theme/pt/multistatecheckbox';

/**
 * SZE MultiStateCheckbox wrapper.
 *
 * Kontrollált használat (`value` + `onChange`) esetén a viselkedés változatlan.
 * Ha nincs `value` prop, a komponens saját állapotot vezet (`defaultValue`-ból).
 * Az állapotok listáját az `options` prop adja – nélküle a PrimeReact nem tud
 * mit léptetni.
 */
const MultiStateCheckbox = ({
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
      <PMultiStateCheckbox
        value={isControlled ? value : uncontrolled}
        onChange={handleChange}
        pt={multistatecheckbox}
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

export default MultiStateCheckbox;
