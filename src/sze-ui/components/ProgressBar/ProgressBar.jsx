import React from 'react';
import { ProgressBar as PrimeProgressBar } from 'primereact/progressbar';

const ProgressBar = ({
  value = 0,
  showValue = true,
  color = 'bg-sze-primary',
  displayFormat = 'percent',
  className = '',
  style = {},
  animated = false,
}) => {
  const colors = {
    primary: '#242943',
    secondary: '#50ADC9',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  const colorMap = {
    'bg-sze-primary': colors.primary,
    'bg-sze-secondary': colors.secondary,
    'bg-green-600': colors.success,
    'bg-yellow-600': colors.warning,
    'bg-red-600': colors.danger,
  };

  const progressColor = colorMap[color] || colors.primary;

  return (
    <div className={`progress-bar-wrapper ${className}`} style={style}>
      <PrimeProgressBar
        value={value}
        showValue={showValue}
        displayFormat={displayFormat}
        color={progressColor}
        className="bg-gray-200 rounded-full overflow-hidden"
      />
    </div>
  );
};

export default ProgressBar;
