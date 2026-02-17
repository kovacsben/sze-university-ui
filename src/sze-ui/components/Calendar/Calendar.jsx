// src/sze-ui/components/Calendar/Calendar.jsx
import { Calendar as PCalendar } from "primereact/calendar";

export default function Calendar({ fullWidth, className, appendTo = "self", ...props }) {
  return (
    <PCalendar
      {...props}
      appendTo={appendTo}
      className={(fullWidth ? "w-full " : "") + (className || "")}
    />
  );
}
