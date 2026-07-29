import React from 'react';

const Steps = ({
  items = [],
  activeIndex = 0,
  onSelect = null,
  readOnly = false,
  className = '',
  style = {},
}) => {
  const handleSelect = (index) => {
    if (!readOnly && onSelect) {
      onSelect(index);
    }
  };

  return (
    <div className={`steps-wrapper ${className}`} style={style}>
      <div className="flex items-center justify-between w-full">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <div
              onClick={() => handleSelect(index)}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold cursor-pointer transition-all ${
                index <= activeIndex
                  ? 'bg-sze-primary text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index < activeIndex ? (
                <i className="pi pi-check text-lg"></i>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Connector Line */}
            {index < items.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < activeIndex ? 'bg-sze-primary' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`text-xs font-medium text-center ${
              index <= activeIndex ? 'text-sze-primary' : 'text-gray-500'
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
