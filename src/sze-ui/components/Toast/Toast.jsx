import React from 'react';
import { Toast as PrimeToast } from 'primereact/toast';

// Az üzenetek portálon át a body-ba kerülnek, ezért nem kell burkoló elem.
// A `position`, `className`, `style`, `appendTo`, `onRemove` stb. változatlanul továbbmegy.
const Toast = React.forwardRef((props, ref) => <PrimeToast ref={ref} {...props} />);

Toast.displayName = 'Toast';

export default Toast;
