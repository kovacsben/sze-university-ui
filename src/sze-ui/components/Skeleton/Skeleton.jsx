import React from 'react';
import { Skeleton as PrimeSkeleton } from 'primereact/skeleton';

const Skeleton = ({
  count = 1,
  width = '100%',
  height = '2rem',
  borderRadius = '0.25rem',
  animation = 'wave',
  className = '',
  style = {},
}) => {
  return (
    <div className={`skeleton-wrapper ${className}`} style={style}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="mb-3">
          <PrimeSkeleton
            width={width}
            height={height}
            borderRadius={borderRadius}
            animation={animation}
            className="bg-gray-200"
          />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
