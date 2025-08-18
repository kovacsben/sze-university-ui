import { InputText as PInputText } from "primereact/inputtext";
export default function InputText({ invalid, className, ...props }) {
  const invalidCls = invalid ? " border-danger ring-danger " : "";
  return <PInputText {...props} aria-invalid={invalid ? "true" : undefined} className={(className || "") + invalidCls} />;
}
