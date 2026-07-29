import React from 'react';
import { TriStateCheckbox as PTriStateCheckbox } from 'primereact/tristatecheckbox';
import { tristatecheckbox } from '../../theme/pt/tristatecheckbox';

const TriStateCheckbox = ({
  value = null,
  onChange = null,
  className = '',
  label = '',
  ...props
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.value);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <PTriStateCheckbox
        value={value}
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
