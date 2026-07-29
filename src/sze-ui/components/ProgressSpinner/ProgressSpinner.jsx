import React from 'react';
import { ProgressSpinner as PrimeProgressSpinner } from 'primereact/progressspinner';

const ProgressSpinner = ({
  strokeWidth = 2,
  fill = 'none',
  animationDuration = '2s',
  className = '',
  style = {},
  showLabel = false,
  label = 'Loading...',
}) => {
  return (
    <div className={`progress-spinner-wrapper flex flex-col items-center justify-center ${className}`} style={style}>
      <div className="relative inline-block">
        <PrimeProgressSpinner
          strokeWidth={strokeWidth}
          fill={fill}
          animationDuration={animationDuration}
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      {showLabel && (
        <p className="mt-4 text-sze-primary font-medium">{label}</p>
      )}
    </div>
  );
};

export default ProgressSpinner;
