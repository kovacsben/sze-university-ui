import { Calendar as PCalendar } from "primereact/calendar";

/**
 * SZE Calendar wrapper
 * - fullWidth: boolean -> w-full az inputra
 * - a többi prop megy változatlanul a PrimeReact Calendernek
 */
export default function Calendar({ fullWidth, className, ...props }) {
  return (
    <PCalendar
      {...props}
      className={(fullWidth ? "w-full " : "") + (className || "")}
    />
  );
}
