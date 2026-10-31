import { useState } from "react";
import { Stepper } from "sze-ui";

export default function Pelda() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper
      steps={[{ label: "Lépés 1" }, { label: "Lépés 2" }, { label: "Lépés 3" }]}
      activeStep={activeStep}
      onStepChange={setActiveStep}
    />
  );
}
