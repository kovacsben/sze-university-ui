import { InputNumber as PInputNumber } from "primereact/inputnumber";
import { inputNumberPT } from "../../theme/pt/inputnumber";

/** SZE InputNumber wrapper */
export default function InputNumber({ fullWidth, className, pt, ...props }) {
  return (
    <PInputNumber
      {...props}
      pt={pt || inputNumberPT}
      className={(fullWidth ? "w-full " : "") + (className || "")}
    />
  );
}
