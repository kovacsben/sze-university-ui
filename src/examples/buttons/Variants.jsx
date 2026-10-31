import { Button } from "sze-ui";

export default function Pelda() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button label="Alapértelmezett" radius="3xl" size="normal" />
      <Button label="Secondary" variant="secondary" radius="3xl" size="normal" />
      <Button label="Outline" variant="outline" radius="3xl" size="normal" />
      <Button label="Text" variant="text" radius="3xl" size="normal" />
      <Button label="Link" variant="link" radius="3xl" size="normal" />
    </div>
  );
}
