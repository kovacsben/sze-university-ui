import { Accordion as PAccordion, AccordionTab } from "primereact/accordion";

/**
 * SZE Accordian - PrimeReact Accordion wrapper
 * 
 * Ez egy szoktatott Accordion komponens, amely a PrimeReact Accordion-ra épít,
 * de SZE-specifikus stílusokkal és Tailwind stílusokkal bővíti azt.
 * 
 * @param {Array} items - Az accordion elemeket tartalmazó tömb. Minden elem:
 *   - header: string (az accordion tab fejléce)
 *   - content: string (az accordion tab tartalma)
 * @param {string} className - További CSS osztályok az accordion-hoz
 * @param {*} props - Összes egyéb PrimeReact Accordion prop
 */
export default function Accordian({ items = [], className, ...props }) {
  return (
    <PAccordion
      {...props}
      className={className || ""}
    >
      {items.map((item, index) => (
        <AccordionTab
          key={index}
          header={item.header}
        >
          {item.content}
        </AccordionTab>
      ))}
    </PAccordion>
  );
}
