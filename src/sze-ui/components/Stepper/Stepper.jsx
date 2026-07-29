import React from 'react';

const Stepper = ({
  steps = [],
  activeStep = 0,
  onStepChange = null,
  orientation = 'vertical',
  className = '',
  style = {},
}) => {
  const handleStepClick = (index) => {
    if (onStepChange) {
      onStepChange(index);
    }
  };

  return (
    <div
      className={`stepper-wrapper ${orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col'} ${className}`}
      style={style}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center ${orientation === 'horizontal' ? 'flex-1' : 'w-full'}`}
        >
          {/* Step Indicator */}
          <div
            onClick={() => handleStepClick(index)}
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold cursor-pointer transition-all ${
              index <= activeStep
                ? 'bg-sze-primary text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {index < activeStep ? (
              <i className="pi pi-check"></i>
            ) : (
              index + 1
            )}
          </div>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                index < activeStep ? 'bg-sze-primary' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
