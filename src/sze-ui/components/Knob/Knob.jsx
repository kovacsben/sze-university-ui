import { Knob as PKnob } from "primereact/knob";

/** SZE Knob – adunk SZE-s default színeket, amik felülírhatók props-szal */
export default function Knob({
  valueColor = "var(--color-sze-primary)",
  rangeColor = "color-mix(in srgb, var(--color-sze-primary) 20%, transparent)",
  textColor  = "currentColor",
  ...props
}) {
  return (
    <PKnob
      valueColor={valueColor}
      rangeColor={rangeColor}
      textColor={textColor}
      {...props}
    />
  );
}
