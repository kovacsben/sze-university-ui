import { useState } from "react";
import { Button, InputOtp } from "sze-ui";

export default function Pelda() {
  const [otp, setOtp] = useState("");

  return (
    <div className="space-y-2">
      <InputOtp value={otp} onChange={(e) => setOtp(e.value)} length={3} />
      <Button label="Ellenőrzés" />
    </div>
  );
}
