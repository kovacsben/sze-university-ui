import React from 'react';
import { Inplace as PrimeInplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';

const Inplace = ({
  value = '',
  onChange = null,
  onSave = null,
  label = '',
  placeholder = 'Kattintson a szerkesztéshez',
  disabled = false,
  className = '',
  displayClassName = '',
  inputClassName = '',
}) => {
  const [activeState, setActiveState] = React.useState(false);
  const [tempValue, setTempValue] = React.useState(value);

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    if (onSave) {
      onSave(tempValue);
    }
    if (onChange) {
      onChange(tempValue);
    }
    setActiveState(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setActiveState(false);
  };

  return (
    <div className={`inplace-wrapper ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <PrimeInplace
        active={activeState}
        onToggle={(e) => {
          setActiveState(e.value);
          if (!e.value) {
            setTempValue(value);
          }
        }}
        disabled={disabled}
        className="w-full"
      >
        <InplaceDisplay
          className={`cursor-pointer px-3 py-2 rounded-lg border-2 border-transparent hover:border-sze-primary-200 transition-all duration-200 text-gray-800 ${displayClassName}`}
        >
          {value || <span className="text-gray-400">{placeholder}</span>}
        </InplaceDisplay>
        <InplaceContent>
          <div className="flex gap-2 items-center">
            <InputText
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className={`flex-1 px-3 py-2 border border-sze-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sze-primary-400 ${inputClassName}`}
              autoFocus
              placeholder={placeholder}
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-sze-primary text-white rounded-lg hover:bg-sze-primary-700 transition-colors duration-200 font-medium text-sm"
            >
              Mentés
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium text-sm"
            >
              Mégse
            </button>
          </div>
        </InplaceContent>
      </PrimeInplace>
    </div>
  );
};

export default Inplace;
