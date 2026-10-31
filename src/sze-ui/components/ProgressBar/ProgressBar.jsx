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

  // A `displayFormat` nem PrimeReact-prop: korábban változatlanul átment a
  // DOM-ig, ahol React-figyelmeztetést okozott ("React does not recognize the
  // displayFormat prop on a DOM element"). A PrimeReact megfelelője a
  // `displayValueTemplate`, ide fordítjuk le.
  const displayValueTemplate = displayFormat === 'value' ? (v) => `${v}` : (v) => `${v}%`;

  return (
    <div className={`progress-bar-wrapper ${className}`} style={style}>
      <PrimeProgressBar
        value={value}
        showValue={showValue}
        displayValueTemplate={displayValueTemplate}
        color={progressColor}
        className="bg-gray-200 rounded-full overflow-hidden"
      />
    </div>
  );
};

export default ProgressBar;
