import React from 'react';
import { Tooltip as PrimeTooltip } from 'primereact/tooltip';

const Tooltip = ({
  target = '',
  content = '',
  position = 'top',
  showDelay = 100,
  hideDelay = 300,
  className = '',
  style = {},
  children = null,
}) => {
  const elementId = React.useId();

  return (
    <div className={`tooltip-wrapper ${className}`} style={style}>
      <div id={elementId} className="cursor-help inline-block">
        {children || (
          <div className="flex items-center gap-1 text-sze-primary-600 hover:text-sze-primary">
            <i className="pi pi-question-circle"></i>
            <span>{content}</span>
          </div>
        )}
      </div>
      <PrimeTooltip
        target={`#${elementId}`}
        content={content}
        position={position}
        showDelay={showDelay}
        hideDelay={hideDelay}
      />
    </div>
  );
};

export default Tooltip;
