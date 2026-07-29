import React from 'react';
import { Toast as PrimeToast } from 'primereact/toast';

const Toast = ({
  ref = null,
  position = 'top-right',
  className = '',
  style = {},
}) => {
  return (
    <div className={`toast-wrapper ${className}`} style={style}>
      <PrimeToast
        ref={ref}
        position={position}
        onRemove={(e) => console.log('Toast removed')}
      />
    </div>
  );
};

export default React.forwardRef((props, ref) => <Toast {...props} ref={ref} />);
