import React from "react";
import { SplitButton ,Button, ButtonGroup, IconButton, InputText, Dropdown, AutoComplete, Checkbox, Dialog, Calendar, Editor, FloatLabel, IconField, InputIcon, InputGroup, InputGroupAddon, InputNumber, InputSwitch, InputOtp, KeyFilteredInput, Knob } from "./sze-ui";


export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [city, setCity] = React.useState(null);
  const [acValue, setAcValue] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [range, setRange] = React.useState(null);
  const [html, setHtml] = React.useState("<p>Kezdő szöveg</p>");
  const [num, setNum] = React.useState(10);
  const [sw, setSw] = React.useState(false);
  const [otp, setOtp] = React.useState("");


  const cities = [
    { name: "Győr", code: "GYO" },
    { name: "Budapest", code: "BUD" },
    { name: "Pécs", code: "PEC" },
  ];

  const items = [
  { label: "Szerkesztés", icon: "pi pi-pencil", command: () => console.log("edit") },
  { label: "Megosztás",   icon: "pi pi-share-alt", command: () => console.log("share") },
  { separator: true },
  { label: "Törlés",      icon: "pi pi-trash", command: () => console.log("delete") },
];


  return (
    <div className="p-8 space-y-8">
    <h1 className="text-5xl font-sze-heading font-bold text-sze-primary">SZE UI – PrimeReact + Tailwind</h1>

      <section className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <Button label="Primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Outline" variant="outline" />
          <Button label="Text" variant="text" />
          <Button label="Link" variant="link" />
          <Button label="Success" severity="success" />
          <Button label="Warning" severity="warning" />
          <Button label="Danger" severity="danger" />
          <IconButton icon="pi pi-ellipsis-h" text aria-label="More" />
        </div>
        <ButtonGroup>
          <Button label="Előző" outlined />
          <Button label="Következő"/>
        </ButtonGroup>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <InputText placeholder="Név" />
          <InputText placeholder="Hibás" invalid className="ring-red-600 focus-visible:ring-1 focus-visible:ring-red-600"/>
          <Dropdown value={city} onChange={(e)=>setCity(e.value)} options={cities} optionLabel="name" placeholder="Válassz várost..." className="w-56" />
          <AutoComplete value={acValue} suggestions={cities.map(c=>c.name).filter(n=>n.toLowerCase().includes((acValue||'').toLowerCase()))} completeMethod={()=>{}} onChange={(e)=>setAcValue(e.value)} placeholder="Keresés…" className="w-56" />
          <label className="inline-flex items-center gap-2"><Checkbox /> <span>Elfogadom</span></label>
        </div>
      </section>

      <section className="space-y-3">
        <Button label="Dialog" onClick={()=>setVisible(true)} />
        <Dialog header="Példa dialog" visible={visible} style={{ width: "30rem" }} onHide={()=>setVisible(false)}
          footer={<div className="flex justify-end gap-2"><Button label="Mégse" outlined onClick={()=>setVisible(false)} /><Button label="OK" onClick={()=>setVisible(false)} /></div>}>
          <p className="m-0">Itt a tartalom.</p>
        </Dialog>
      </section>


      

      <section className="space-y-3">
        
        <SplitButton label="Műveletek" model={items} />
        
        <SplitButton label="Továbbiak" variant="secondary" model={items} />
        
        <SplitButton label="Opciók" variant="outline" model={items} />
        
        <SplitButton label="Akciók" variant="text" model={items} size="small" />
      </section>

      
        {/* Calendar demo */}
      <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-sze-primary">Egynapos</h2>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon
              placeholder="Válassz dátumot"
              className="w-64"
            />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-sze-primary">Időintervallum</h2>
        <Calendar
          value={range}
          onChange={(e) => setRange(e.value)}
          selectionMode="range"
          showIcon
          showButtonBar
          placeholder="Válassz időszakot"
          className="w-72"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-sze-primary">Dátum + idő</h2>
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          showTime
          hourFormat="24"
          showIcon
          placeholder="Dátum és idő"
          className="w-80"
        />
      </div>

      <Button label="Mentés" />
      </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-sze-primary">Dátum + idő + másodperc</h2>
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            showTime
            showSeconds
            hourFormat="24"
            showIcon
            placeholder="Dátum, idő és másodperc"
            className="w-80"
          />
      </div>
      <div className="space-y-4">
        <Editor
          value={html}
          onChange={(newHtml) => setHtml(newHtml)}
          placeholder="Írj valamit…"
          fullWidth
          height={360}
        />

        <div className="flex gap-2">
          <Button label="Mentés" />
          <Button label="Csak olvasható" variant="outline" />
        </div>

        <h3 className="text-sm font-semibold text-black/60">Előnézet (HTML):</h3>
        <pre className="whitespace-pre-wrap rounded-xl bg-black/5 p-3 text-xs">
          {html}
        </pre>
      </div>


    <FloatLabel id="name" label="Név">
      <InputText placeholder=" " className="w-72" />
    </FloatLabel>


    <FloatLabel id="date" label="Dátum">
      <Calendar showIcon className="w-72" />
    </FloatLabel>


    <FloatLabel id="city" label="Város">
      <Dropdown options={cities} optionLabel="name" className="w-72" />
    </FloatLabel>


    <IconField>
      <InputIcon icon="pi pi-search" position="left" />
      <InputText placeholder="Keresés…" className="w-72" />
    </IconField>


    <IconField>
      <InputText placeholder="Email" className="w-72" />
      <InputIcon icon="pi pi-envelope" position="right" />
    </IconField>


    <IconField>
      <InputText invalid placeholder=" " className="w-72" />
      <InputIcon icon="pi pi-exclamation-circle" position="right" className="text-danger" />
    </IconField>

    <InputGroup className="max-w-xl">
      <InputGroupAddon>https://</InputGroupAddon>
      <InputText placeholder="domain" />
      <InputGroupAddon>.hu</InputGroupAddon>
    </InputGroup>

    <InputGroup className="max-w-xl">
      <Dropdown options={[{name:'+36'},{name:'+49'}]} optionLabel="name" className="w-24" />
      <InputText placeholder="Telefonszám" />
      <Button label="Küldés" />
    </InputGroup>

    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap items-center">
        <InputText placeholder="Név" className="w-56" />
        <KeyFilteredInput placeholder="Csak szám" keyfilter="int" className="w-40" />
        <InputNumber value={num} onValueChange={(e)=>setNum(e.value)} showButtons className="w-40" />
        <InputSwitch checked={sw} onChange={(e)=>setSw(e.value)} />
      </div>


      <div className="flex items-center gap-3">
        <InputOtp value={otp} onChange={(e)=>setOtp(e.value)} length={6} />
        <Button label="Ellenőrzés" />
      </div>

      <Knob value={num} onChange={(e)=>setNum(e.value)} min={0} max={100} />
    </div>




    </div>
  );
}
