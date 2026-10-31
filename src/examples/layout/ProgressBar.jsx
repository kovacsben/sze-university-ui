import { useState } from "react";
import { Button, ProgressBar } from "sze-ui";

export default function Pelda() {
  const [progressValue, setProgressValue] = useState(45);

  return (
    <div className="space-y-4">
      <div>
        <ProgressBar value={progressValue} showValue />
      </div>
      <div className="flex gap-2">
        <Button label="Előrelépés" onClick={() => setProgressValue(Math.min(100, progressValue + 10))} />
        <Button label="Visszaállít" onClick={() => setProgressValue(0)} variant="outline" />
      </div>
    </div>
  );
}
