import { Button, Dropdown, InputGroup, InputGroupAddon, InputText } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-2">
      <InputGroup className="max-w-xl">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputText placeholder="domain" />
        <InputGroupAddon>.hu</InputGroupAddon>
      </InputGroup>
      <InputGroup className="max-w-xl">
        <Dropdown options={[{ name: "+36" }, { name: "+49" }]} optionLabel="name" className="w-24" />
        <InputText placeholder="Telefonszám" />
        <Button label="Küldés" />
      </InputGroup>
    </div>
  );
}
