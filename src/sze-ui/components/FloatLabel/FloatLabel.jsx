import React from "react";
import { FloatLabel as PFloatLabel } from "primereact/floatlabel";

/**
 * SZE FloatLabel wrapper
 * Props:
 *  - id: string (kötelező, a label for ehhez köt)
 *  - label: string | ReactNode
 *  - children: egyetlen beviteli komponens (InputText, Dropdown, Calendar, Textarea, stb.)
 *  - className: extra osztály a gyökérre
 *
 * Megjegyzés: a gyerek komponensnek átadjuk az `id` és `inputId` propot,
 * hogy a label biztosan összekössön vele (PrimeReact komponensek eltérően nevezik).
 */
export default function FloatLabel({ id, label, children, className }) {
  const child = React.Children.only(children);
  const childWithIds = React.cloneElement(child, {
    id: child.props.id ?? id,
    inputId: child.props.inputId ?? id,
    // adunk egy "peer" class-t is, ha később peer-alapú trükköket szeretnél
    className: (child.props.className || "") + " peer",
  });

  return (
    <PFloatLabel className={"sze-floatlabel block relative " + (className || "")}>
      {childWithIds}
      <label htmlFor={id} className="sze-floatlabel-label">
        {label}
      </label>
    </PFloatLabel>
  );
}
