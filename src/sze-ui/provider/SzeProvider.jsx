import React from "react";
import { PrimeReactProvider } from "primereact/api";
import { pt as basePt } from "../theme/pt";

export default function SzeProvider({ children, pt }) {
  const value = { unstyled: true, pt: { ...basePt, ...(pt || {}) } };
  return <PrimeReactProvider value={value}>{children}</PrimeReactProvider>;
}
