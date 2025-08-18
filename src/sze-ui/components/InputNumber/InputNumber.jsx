import { InputNumber as PInputNumber } from "primereact/inputnumber";

/** SZE InputNumber wrapper */
export default function InputNumber({ fullWidth, className, ...props }) {
  return (
    <PInputNumber
      {...props}
      className={(fullWidth ? "w-full " : "") + (className || "")}
    />
  );
}
