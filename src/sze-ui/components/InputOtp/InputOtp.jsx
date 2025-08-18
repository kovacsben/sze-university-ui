import { InputOtp as PInputOtp } from "primereact/inputotp";

/** SZE InputOtp (egy kód mező több cellával) */
export default function InputOtp({ className, ...props }) {
  return <PInputOtp {...props} className={className} />;
}
