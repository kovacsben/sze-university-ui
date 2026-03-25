import React from "react";
import TailwindDemo from "./TailwindDemo";
import { SplitButton, Button, ButtonGroup, IconButton, InputText, Dropdown, AutoComplete, Checkbox, Dialog, Calendar, Editor, FloatLabel, IconField, InputIcon, InputGroup, InputGroupAddon, InputNumber, InputSwitch, InputOtp, KeyFilteredInput, Knob, Listbox, Mention, MultiSelect, MultiStateCheckbox, Password, RadioButton, Rating, SelectButton, Slider, TreeSelect, TriStateCheckbox, ToggleButton } from "./sze-ui";

export default function App() {
  // ===== STATE MANAGEMENT =====
  const [visible, setVisible] = React.useState(false);
  const [city, setCity] = React.useState(null);
  const [acValue, setAcValue] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [range, setRange] = React.useState(null);
  const [html, setHtml] = React.useState("<p>Kezdő szöveg</p>");
  const [num, setNum] = React.useState(10);
  const [sw, setSw] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [RB, setRB] = React.useState("a");
  const [rating, setRating] = React.useState(3);
  const [range1, setRange1] = React.useState(30);
  const [toggle, setToggle] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("buttons");

  // ===== DATA =====
  const options = [{name:"Győr"},{name:"Pécs"},{name:"Budapest"}];
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

  // ===== COMPONENT WRAPPERS =====
  const ComponentCard = ({ title, description, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg text-sze-primary mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
        activeTab === id
          ? "bg-sze-primary text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <i className={icon}></i>
      {label}
    </button>
  );

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-sze-primary to-sze-primary-900 text-white py-12 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-2 text-white">SZE UI Component Library</h1>
          <p className="text-sze-secondary-100 text-lg">Széchényi István Egyetem • PrimeReact + Tailwind CSS</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* NAVIGATION TABS */}
        <div className="mb-8 flex flex-wrap gap-2">
          <TabButton id="buttons" label="Gombok" icon="pi pi-check-square" />
          <TabButton id="inputs" label="Input Mezők" icon="pi pi-pencil" />
          <TabButton id="selection" label="Kiválasztás" icon="pi pi-list" />
          <TabButton id="datetime" label="Dátum & Idő" icon="pi pi-calendar" />
          <TabButton id="advanced" label="Haladó" icon="pi pi-sliders-v" />
          <TabButton id="layout" label="Layout & Forma" icon="pi pi-window-maximize" />
          <TabButton id="tailwind" label="Tailwind Demo" icon="pi pi-palette" />
        </div>

        {/* ===== TAILWIND DEMO TAB ===== */}
        {activeTab === "tailwind" && (
          <TailwindDemo />
        )}

        {/* ===== BUTTONS TAB ===== */}
        {activeTab === "buttons" && (
          <div className="space-y-6">
            <ComponentCard title="Gomb Variációk" description="Összes rendelkezésre álló gomb stil">
              <div className="flex flex-wrap gap-2">
                <Button label="Alapértelmezett" />
                <Button label="Secondary" variant="secondary" />
                <Button label="Outline" variant="outline" />
                <Button label="Text" variant="text" />
                <Button label="Link" variant="link" />
              </div>
            </ComponentCard>

            <ComponentCard title="Gombok - Severity Szintek" description="Különböző fontosságot jelző szintek">
              <div className="flex flex-wrap gap-2">
                <Button label="Info" />
                <Button label="Siker" severity="success" />
                <Button label="Figyelem" severity="warning" />
                <Button label="Hiba" severity="danger" />
              </div>
            </ComponentCard>

            <ComponentCard title="Ikon Gombok" description="Csak ikonokat tartalmazó gombok">
              <div className="flex gap-3">
                <IconButton icon="pi pi-home" />
                <IconButton icon="pi pi-user" />
                <IconButton icon="pi pi-cog" />
                <IconButton icon="pi pi-bell" />
                <IconButton icon="pi pi-heart" />
                <IconButton icon="pi pi-envelope" />
              </div>
            </ComponentCard>

            <ComponentCard title="Gombcsoport" description="Összekapcsolt gombok">
              <ButtonGroup>
                <Button label="Csapatok" icon="pi pi-users" />
                <Button label="Projektek" icon="pi pi-briefcase" />
                <Button label="Beállítások" icon="pi pi-cog" />
              </ButtonGroup>
            </ComponentCard>

            <ComponentCard title="Lenyitható Gomb" description="Menü nélküli gomb">
              <div className="flex gap-3">
                <SplitButton label="Műveletek" model={items} />
                <SplitButton label="Műveletek" severity="secondary" model={items} />
                <SplitButton label="Műveletek" severity="success" model={items} />
                <SplitButton label="Műveletek" severity="warning" model={items} />
              </div>
            </ComponentCard>
          </div>
        )}

        {/* ===== INPUT FIELDS TAB ===== */}
        {activeTab === "inputs" && (
          <div className="space-y-6">
            <ComponentCard title="Szöveg Input" description="Alapvető szöveg beviteli mezők">
              <div className="space-y-2 max-w-lg">
                <InputText placeholder="Sima szöveg input" className="w-full" />
                <InputText placeholder="Határozatlan" invalid className="w-full ring-red-600 focus-visible:ring-1 focus-visible:ring-red-600" />
              </div>
            </ComponentCard>

            <ComponentCard title="Szűrt Input" description="Speciális szűrésű bevitel">
              <div className="space-y-2 max-w-lg">
                <KeyFilteredInput placeholder="Csak számok" keyfilter="int" className="w-full" />
                <InputNumber value={num} onValueChange={(e)=>setNum(e.value)} showButtons className="w-full" />
              </div>
            </ComponentCard>

            {/*Jelszó Input - KÉSZ*/}

            <ComponentCard title="Jelszó Input" description="Biztonságos jelszó bevitel">
              <div className="max-w-lg ">
                <Password feedback placeholder="Jelszó" />
              </div>
            </ComponentCard>

            {/*Ikon Input - */}

            <ComponentCard title="Ikon Mezők" description="Input ikokkal">
              <div className="space-y-2 max-w-lg gap-3">
                <IconField>
                  <InputIcon icon="pi pi-search" position="right" />
                  <InputText placeholder="Keresés…" className="w-full" />
                </IconField>
                <IconField>
                  <InputText placeholder="Email" className="w-full" />
                  <InputIcon icon="pi pi-envelope" position="right" />
                </IconField>
              </div>
            </ComponentCard>

            <ComponentCard title="Input Csoport" description="Csoportosított inputok">
              <div className="space-y-2">
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
              </div>
            </ComponentCard>

            <ComponentCard title="Float Label" description="Úszó címkés inputok">
              <div className="space-y-3">
                <FloatLabel label="Név">
                  <InputText placeholder=" " className="w-72" />
                </FloatLabel>
                <FloatLabel label="Email">
                  <InputText placeholder=" " className="w-72" />
                </FloatLabel>
              </div>
            </ComponentCard>
          </div>
        )}

        {/* ===== SELECTION TAB ===== */}
        {activeTab === "selection" && (
          <div className="space-y-6">
            <ComponentCard title="Lenyitható Lista" description="Opcióból kiválasztás">
              <Dropdown value={city} onChange={(e)=>setCity(e.value)} options={cities} optionLabel="name" placeholder="Válassz várost..." className="w-full max-w-sm" />
            </ComponentCard>

            <ComponentCard title="Automatikus Kiegészítés" description="Javaslatokkal dolgozó input">
              <AutoComplete 
                value={acValue} 
                suggestions={cities.map(c=>c.name).filter(n=>n.toLowerCase().includes((acValue||'').toLowerCase()))} 
                onChange={(e)=>setAcValue(e.value)} 
                placeholder="Keresés…" 
                className="w-full max-w-sm" 
              />
            </ComponentCard>

            <ComponentCard title="Jelölőnégyzet" description="Logikai értékek választása">
              <div className="space-y-2">
                <label className="inline-flex items-center gap-2">
                  <Checkbox />
                  <span>Fogadok el</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <Checkbox />
                  <span>Marketing e-mailek</span>
                </label>
              </div>
            </ComponentCard>

            <ComponentCard title="Rádiógomb" description="Kizárólagos választás">
              <div className="space-y-2">
                <label className="inline-flex items-center gap-2">
                  <RadioButton inputId="opt1" name="options" value="a" onChange={(e)=>setRB(e.value)} checked={RB==="a"} />
                  <span>Opció A</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <RadioButton inputId="opt2" name="options" value="b" onChange={(e)=>setRB(e.value)} checked={RB==="b"} />
                  <span>Opció B</span>
                </label>
              </div>
            </ComponentCard>

            <ComponentCard title="Multi-Select" description="Több opció kiválasztása">
              <MultiSelect options={options} optionLabel="name" placeholder="Városok kiválasztása..." className="w-full max-w-sm" />
            </ComponentCard>

            <ComponentCard title="Jogi Statusz Jelölőnégyzet" description="Három állapotú jelölőnégyzet">
              <MultiStateCheckbox />
            </ComponentCard>

            <ComponentCard title="Toggle Gomb" description="Bekapcsolható/kikapcsolható gomb">
              <ToggleButton checked={toggle} onChange={(e)=>setToggle(e.value)} onLabel="Bekapcsolva" offLabel="Kikapcsolva" />
            </ComponentCard>
          </div>
        )}

        {/* ===== DATE & TIME TAB ===== */}
        {activeTab === "datetime" && (
          <div className="space-y-6">
            <ComponentCard title="Naptár - Egynap" description="Egyetlen nap kiválasztása">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
                placeholder="Válassz dátumot"
                inline
              />
            </ComponentCard>

            <ComponentCard title="Naptár - Tartomány" description="Dátumtartomány kiválasztása">
              <Calendar
                value={range}
                onChange={(e) => setRange(e.value)}
                selectionMode="range"
                showIcon
                showButtonBar
                placeholder="Válassz időszakot"
              />
            </ComponentCard>

            <ComponentCard title="Naptár - Idővel" description="Dátum és idő kiválasztása">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                hourFormat="24"
                showIcon
                placeholder="Dátum és idő"
                hideOnDateTimeSelect={false}
              />
            </ComponentCard>
          </div>
        )}

        {/* ===== ADVANCED TAB ===== */}
        {activeTab === "advanced" && (
          <div className="space-y-6">
            <ComponentCard title="Csúszka" description="Numerikus értékek kiválasztása">
              <Slider value={range1} onChange={(e)=>setRange1(e.value)} className="w-64" />
            </ComponentCard>

            <ComponentCard title="Forgó Gomb" description="Numerikus bevitel gömbön keresztül">
              <Knob value={num} onChange={(e)=>setNum(e.value)} min={0} max={100} />
            </ComponentCard>

            <ComponentCard title="OTP Input" description="Egyszeri jelszó bevitele">
              <div className="space-y-2">
                <InputOtp value={otp} onChange={(e)=>setOtp(e.value)} length={6} />
                <Button label="Ellenőrzés" />
              </div>
            </ComponentCard>

            <ComponentCard title="Kapcsoló" description="Bekapcsolható/kikapcsolható">
              <InputSwitch checked={sw} onChange={(e)=>setSw(e.value)} />
            </ComponentCard>

            <ComponentCard title="Értékelés" description="Csillag értékelés">
              <Rating value={rating} onChange={(e)=>setRating(e.value)} cancel={false} />
            </ComponentCard>

            <ComponentCard title="Gomb Kiválasztás" description="Gombok közötti választás">
              <SelectButton options={["Nappali","Éjjeli"]} className="w-full" />
            </ComponentCard>
          </div>
        )}

        {/* ===== LAYOUT TAB ===== */}
        {activeTab === "layout" && (
          <div className="space-y-6">
            <ComponentCard title="Rich Text Editor" description="HTML szerkesztés">
              <div className="space-y-3">
                <Editor
                  value={html}
                  onChange={(e) => setHtml(e)}
                  style={{ height: "320px" }}
                />
                <div className="flex gap-2">
                  <Button label="Mentés" />
                  <Button label="Előnézet" variant="outline" />
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                  <strong>HTML Preview:</strong>
                  <pre className="text-xs mt-2 overflow-x-auto">{html}</pre>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Dialog / Modal" description="Modal párbeszéd">
              <div>
                <Button label="Dialog Megnyitása" onClick={()=>setVisible(true)} />
                <Dialog 
                  header="Biztosan folytatod?" 
                  visible={visible} 
                  style={{ width: "30rem" }} 
                  onHide={()=>setVisible(false)}
                  footer={
                    <div className="flex justify-end gap-2">
                      <Button label="Mégse" outlined onClick={()=>setVisible(false)} />
                      <Button label="OK" onClick={()=>setVisible(false)} />
                    </div>
                  }
                >
                  <p>Ez egy modal párbeszéd komponens.</p>
                </Dialog>
              </div>
            </ComponentCard>

            <ComponentCard title="Split Button" description="Gomb menüvel">
              <div className="space-y-2">
                <SplitButton label="Műveletek" model={items} />
                <SplitButton label="Lehetőségek" variant="secondary" model={items} />
                <SplitButton label="Akciók" variant="outline" model={items} />
              </div>
            </ComponentCard>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-16 pt-8 border-t border-gray-300 text-center text-gray-600">
          <p className="mb-2">SZE UI Component Library v1.0</p>
          <p className="text-sm">Powered by React, PrimeReact & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
