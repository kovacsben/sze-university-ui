import { InputText } from "primereact/inputtext";

/** KeyFilterelt InputText – pl.: keyfilter="int" | "num" | /regex/ */
export default function KeyFilteredInput({ keyfilter = "int", className, ...props }) {
  return <InputText keyfilter={keyfilter} {...props} className={className} />;
}
