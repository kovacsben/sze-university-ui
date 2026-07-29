import React from 'react';
import { MultiStateCheckbox as PMultiStateCheckbox } from 'primereact/multistatecheckbox';
import { multistatecheckbox } from '../../theme/pt/multistatecheckbox';

const MultiStateCheckbox = ({
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
      <PMultiStateCheckbox
        value={value}
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
