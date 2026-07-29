import React from 'react';
import { Timeline as PrimeTimeline } from 'primereact/timeline';

const Timeline = ({
  value = [],
  align = 'left',
  layout = 'vertical',
  className = '',
  style = {},
  dataKey = '',
}) => {
  const customMarker = (item) => {
    return (
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-sze-primary text-white font-semibold">
        <i className={`${item.icon} text-lg`}></i>
      </span>
    );
  };

  const customContent = (item) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h4 className="font-semibold text-sze-primary mb-2">{item.title}</h4>
        <p className="text-gray-600 text-sm">{item.description}</p>
        {item.date && (
          <small className="text-gray-500 block mt-2">{item.date}</small>
        )}
      </div>
    );
  };

  return (
    <div className={`timeline-wrapper ${className}`} style={style}>
      <PrimeTimeline
        value={value}
        align={align}
        layout={layout}
        marker={customMarker}
        content={customContent}
        className="timeline-custom"
      />
    </div>
  );
};

export default Timeline;
