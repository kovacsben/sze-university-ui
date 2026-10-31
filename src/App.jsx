import React from "react";
import TailwindDemo from "./TailwindDemo";
import Playground from "./components/Playground";
import { Accordian, Avatar, Breadcrumb, Card, Chip, ConfirmDialog, ConfirmPopUp, Divider, FieldSet, Gallery, Inplace, Menu, Megamenu, Menubar, Message, Messages, Paginator, Panel, ProgressBar, ProgressSpinner, ScrollPanel, Sidebar, Skeleton, Stepper, Steps, TabMenu, TieredMenu, Timeline, TimePicker, Toast, Toolbar, Tooltip, Tree, SplitButton, Button, ButtonGroup, IconButton, InputText, Dropdown, AutoComplete, Checkbox, Dialog, Calendar, Editor, FloatLabel, IconField, InputIcon, InputGroup, InputGroupAddon, InputNumber, InputSwitch, InputOtp, KeyFilteredInput, Knob, Listbox, Mention, MultiSelect, MultiStateCheckbox, Password, RadioButton, Rating, SelectButton, Slider, TreeSelect, TriStateCheckbox, ToggleButton } from "./sze-ui";

/**
 * A "Fa Komponens" demó adatai: a Széchenyi István Egyetem karai és azok
 * alapképzési (BSc/BA) szakjai.
 *
 * Csak alapképzés szerepel benne - az osztatlan képzések (pl. jogász,
 * építészmérnök) és a mesterképzések szándékosan kimaradtak.
 *
 * A listát karonként tartjuk, és ebből generáljuk a TreeNode-okat (lásd
 * lentebb), így egy szak felvétele egy sor, nem egy kulcsokkal és ikonokkal
 * teli objektum.
 */
const SZE_KAROK = [
  {
    nev: "Audi Hungaria Járműmérnöki Kar",
    rovid: "AHJK",
    szakok: [
      "Járműmérnöki",
      "Gépészmérnöki",
      "Mechatronikai mérnöki",
      "Anyagmérnöki",
      "Logisztikai mérnöki",
    ],
  },
  {
    nev: "Gépészmérnöki, Informatikai és Villamosmérnöki Kar",
    rovid: "GIVK",
    szakok: [
      "Mérnökinformatikus",
      "Programtervező informatikus",
      "Villamosmérnöki",
      "Gazdaságinformatikus",
    ],
  },
  {
    nev: "Építész-, Építő- és Közlekedésmérnöki Kar",
    rovid: "ÉÉKK",
    szakok: ["Építőmérnöki", "Közlekedésmérnöki"],
  },
  {
    nev: "Kautz Gyula Gazdaságtudományi Kar",
    rovid: "KGK",
    szakok: [
      "Gazdálkodási és menedzsment",
      "Kereskedelem és marketing",
      "Nemzetközi gazdálkodás",
      "Pénzügy és számvitel",
      "Turizmus-vendéglátás",
    ],
  },
  {
    nev: "Deák Ferenc Állam- és Jogtudományi Kar",
    rovid: "DFÁJK",
    szakok: ["Nemzetközi tanulmányok", "Munkaügyi és társadalombiztosítási igazgatási"],
  },
  {
    nev: "Apáczai Csere János Pedagógiai, Humán- és Társadalomtudományi Kar",
    rovid: "AK",
    szakok: [
      "Óvodapedagógus",
      "Tanító",
      "Gyógypedagógia",
      "Szociálpedagógia",
      "Közösségszervezés",
    ],
  },
  {
    nev: "Egészség- és Sporttudományi Kar",
    rovid: "ESK",
    szakok: [
      "Ápolás és betegellátás",
      "Egészségügyi gondozás és prevenció",
      "Sport- és rekreációszervezés",
      "Szociális munka",
    ],
  },
  {
    nev: "Művészeti Kar",
    rovid: "MK",
    szakok: ["Előadó-művészet", "Alkotóművészet és muzeológia"],
  },
];

/** A karlistából PrimeReact TreeNode-fát épít: egyetem > kar > szak. */
const SZE_FA = [
  {
    key: "0",
    label: "Széchenyi István Egyetem",
    data: "Győr",
    icon: "pi pi-fw pi-building",
    children: SZE_KAROK.map((kar, i) => ({
      key: `0-${i}`,
      label: kar.nev,
      data: kar.rovid,
      icon: "pi pi-fw pi-folder",
      children: kar.szakok.map((szak, j) => ({
        key: `0-${i}-${j}`,
        label: szak,
        data: kar.rovid,
        icon: "pi pi-fw pi-file",
      })),
    })),
  },
];

/**
 * Összegyűjti minden olyan csomópont kulcsát, amelynek van gyereke.
 * A demó így nyitottan indul - zárt gyökérrel nem látszana, mit tud a
 * komponens. A fából származtatjuk, hogy új kar felvételekor is stimmeljen.
 */
function expandableKeys(nodes, acc = {}) {
  for (const node of nodes) {
    if (node.children?.length) {
      acc[node.key] = true;
      expandableKeys(node.children, acc);
    }
  }
  return acc;
}

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
  const [dayNight, setDayNight] = React.useState("Nappali");
  const [activeTab, setActiveTab] = React.useState("buttons");
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [paginatorFirst, setPaginatorFirst] = React.useState(0);
  // A lapméretet is állapotban tartjuk, különben a "sor/oldal" legördülő
  // kiválasztása nem csinál semmit (a rows fix érték maradna).
  const [paginatorRows, setPaginatorRows] = React.useState(10);
  // A fa demó nyitottan indul, hogy a karok és a szakok is látszódjanak.
  const [expandedKeys, setExpandedKeys] = React.useState(() => expandableKeys(SZE_FA));
  const [progressValue, setProgressValue] = React.useState(45);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [activeTabMenu, setActiveTabMenu] = React.useState(0);
  const [treeSelectedKeys, setTreeSelectedKeys] = React.useState(null);
  const [chips, setChips] = React.useState([
    { id: 1, label: "React", severity: "primary" },
    { id: 2, label: "JavaScript", severity: "secondary" },
    { id: 3, label: "Tailwind", severity: "success" },
    { id: 4, label: "PrimeReact", severity: "warning" }
  ]);
  const [confirmInfoVisible, setConfirmInfoVisible] = React.useState(false);
  const [confirmWarningVisible, setConfirmWarningVisible] = React.useState(false);
  const [confirmDangerVisible, setConfirmDangerVisible] = React.useState(false);
  const [popupInfoVisible, setPopupInfoVisible] = React.useState(false);
  const [popupWarningVisible, setPopupWarningVisible] = React.useState(false);
  const [popupSuccessVisible, setPopupSuccessVisible] = React.useState(false);
  const [inplaceValue, setInplaceValue] = React.useState("Széchenyi István Egyetem");
  const [inplaceDescription, setInplaceDescription] = React.useState("Győr, Magyarország");
  const [messages, setMessages] = React.useState([]);

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

  const accordianItems = [
    {
      header: "🎓 Széchenyi István Egyetem Bemutatása",
      content: "A Széchenyi István Egyetem (SZE) Magyarország egyik vezető felsőoktatási intézménye. Az egyetem modern képzéseket és kutatási lehetőségeket kínál a hallgatók számára."
    },
    {
      header: "💼 Mérnöki Programok",
      content: "Széleskörű mérnöki szakok közül választhat: Gépészmérnöki, Elektromérnöki, Informatikai, Építőmérnöki, és még sok más program áll rendelkezésre."
    },
    {
      header: "🔬 Kutatási Lehetőségek",
      content: "Az egyetem aktívan támogatja a tudományos kutatást. Számos kutatási projekt és laboratorium áll az oktatók és hallgatók rendelkezésére módszerek és technológiák fejlesztésére."
    },
    {
      header: "🌍 Nemzetközi Kapcsolatok",
      content: "Az SZE nemzetközi partnervárostok széles hálózatával működik együtt, és csereprogramokat kínál a hallgatók számára szerte a világon."
    }
  ];

  const breadcrumbItems = [
    { label: "Kezdőoldal", icon: "pi pi-home", command: () => console.log("home") },
    { label: "Széchenyi István Egyetem", command: () => console.log("sze") },
    { label: "Mérnöki Kar", command: () => console.log("engineering") },
    { label: "Informatika", command: () => console.log("it") }
  ];

  // ===== COMPONENT WRAPPERS =====
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

        {/* ===== TAILWIND DEMO TAB ===== */}
        {activeTab === "tailwind" && (
          <TailwindDemo />
        )}

        {/* ===== BUTTONS TAB ===== */}
        {activeTab === "buttons" && (
          <div className="space-y-6">
            <Playground
              title="Gomb Variációk"
              description="Összes rendelkezésre álló gomb stil - próbáld ki a lekerekítés és méret élő módosítását"
              controls={[
                { prop: "radius", label: "Lekerekítés", options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"], default: "3xl" },
                { prop: "size", label: "Méret", options: ["small", "normal", "large"], default: "normal" },
              ]}
              render={(v) => (
                <div className="flex flex-wrap gap-2">
                  <Button label="Alapértelmezett" radius={v.radius} size={v.size} />
                  <Button label="Secondary" variant="secondary" radius={v.radius} size={v.size} />
                  <Button label="Outline" variant="outline" radius={v.radius} size={v.size} />
                  <Button label="Text" variant="text" radius={v.radius} size={v.size} />
                  <Button label="Link" variant="link" radius={v.radius} size={v.size} />
                </div>
              )}
              code={(v) => `<Button label="Alapértelmezett" radius="${v.radius}" size="${v.size}" />`}
            />


            <Playground title="Gombok - Severity Szintek" description="Különböző fontosságot jelző szintek">
              <div className="flex flex-wrap gap-2">
                <Button label="Info" />
                <Button label="Siker" severity="success" />
                <Button label="Figyelem" severity="warning" />
                <Button label="Hiba" severity="danger" />
              </div>
            </Playground>

            <Playground title="Ikon Gombok" description="Csak ikonokat tartalmazó gombok">
              <div className="flex gap-3">
                <IconButton icon="pi pi-home" />
                <IconButton icon="pi pi-user" />
                <IconButton icon="pi pi-cog" />
                <IconButton icon="pi pi-bell" />
                <IconButton icon="pi pi-heart" />
                <IconButton icon="pi pi-envelope" />
              </div>
            </Playground>

            <Playground title="Gombcsoport" description="Összekapcsolt gombok">
              <ButtonGroup>
                <Button label="Csapatok" icon="pi pi-users" />
                <Button label="Projektek" icon="pi pi-briefcase" />
                <Button label="Beállítások" icon="pi pi-cog" />
              </ButtonGroup>
            </Playground>

            <Playground title="Lenyitható Gomb (SplitButton)" description="Gomb menüvel">
              <div className="flex flex-wrap gap-3">
                <SplitButton label="Műveletek" model={items} />
                <SplitButton label="Műveletek" severity="secondary" model={items} />
                <SplitButton label="Műveletek" severity="success" model={items} />
                <SplitButton label="Műveletek" severity="warning" model={items} />
              </div>
            </Playground>

            <Playground title="Toggle Gomb" description="Bekapcsolható/kikapcsolható gomb">
              <ToggleButton checked={toggle} onChange={(e)=>setToggle(e.value)} onLabel="Bekapcsolva" offLabel="Kikapcsolva" />
            </Playground>

            <Playground title="Gomb Kiválasztás" description="Gombok közötti választás">
              <SelectButton
                options={["Nappali", "Éjjeli"]}
                value={dayNight}
                onChange={(a) => a.value !== null && setDayNight(a.value)}
                className="w-full"
              />
            </Playground>

            <Playground title="Eszköztár" description="Eszköztár gombok gyűjteménye">
              <Toolbar
                items={[
                  { icon: "pi pi-home", label: "Otthon", title: "Kezdőoldal" },
                  { separator: true },
                  { icon: "pi pi-file", label: "Új", title: "Új dokumentum" },
                  { icon: "pi pi-folder-open", label: "Megnyitás", title: "Fájl megnyitása" },
                  { icon: "pi pi-save", label: "Mentés", title: "Dokumentum mentése" },
                  { separator: true },
                  { icon: "pi pi-print", label: "Nyomtatás", severity: "info", title: "Nyomtatás" }
                ]}
              />
            </Playground>
          </div>
        )}

        {/* ===== INPUT FIELDS TAB ===== */}
        {activeTab === "inputs" && (
          <div className="space-y-6">
            <Playground
              title="Szöveg Input"
              description="Alapvető szöveg beviteli mezők - próbáld ki a lekerekítés és méret élő módosítását"
              controls={[
                { prop: "radius", label: "Lekerekítés", options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"], default: "3xl" },
                { prop: "size", label: "Méret", options: ["small", "normal", "large"], default: "normal" },
              ]}
              render={(v) => (
                <div className="space-y-2 max-w-lg">
                  <InputText placeholder="Sima szöveg input" radius={v.radius} size={v.size} className="w-full" />
                  <InputText placeholder="Határozatlan" invalid radius={v.radius} size={v.size} className="w-full ring-red-600 focus-visible:ring-1 focus-visible:ring-red-600" />
                </div>
              )}
              code={(v) => `<InputText placeholder="Sima szöveg input" radius="${v.radius}" size="${v.size}" />`}
            />

            <Playground title="Szűrt Input" description="Speciális szűrésű bevitel">
              <div className="space-y-2 max-w-lg">
                <KeyFilteredInput placeholder="Csak számok" keyfilter="int" className="w-full" />
                <InputNumber value={num} onValueChange={(e)=>setNum(e.value)} showButtons className="w-full" />
              </div>
            </Playground>

            <Playground title="Jelszó Input" description="Biztonságos jelszó bevitel">
              <div className="max-w-lg ">
                <Password feedback placeholder="Jelszó" />
              </div>
            </Playground>

            <Playground title="Ikon Mezők" description="Input ikonokkal">
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
            </Playground>

            <Playground title="Input Csoport" description="Csoportosított inputok">
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
            </Playground>

            <Playground title="Float Label" description="Úszó címkés inputok">
              <div className="space-y-3">
                <FloatLabel label="Név">
                  <InputText placeholder=" " className="w-72" />
                </FloatLabel>
                <FloatLabel label="Email">
                  <InputText placeholder=" " className="w-72" />
                </FloatLabel>
              </div>
            </Playground>

            <Playground title="Bankkártya adatok bevitele" description="3x input egy csoportban">
              <div className="space-y-2">
                <InputOtp value={otp} onChange={(e)=>setOtp(e.value)} length={3} />
                <Button label="Ellenőrzés" />
              </div>
            </Playground>

            <Playground title="Rich Text Editor" description="HTML szerkesztés">
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
            </Playground>

            <Playground title="Csúszka" description="Numerikus értékek kiválasztása">
              <Slider value={range1} onChange={(e)=>setRange1(e.value)} className="w-64" />
            </Playground>

            <Playground title="Forgó Gomb" description="Numerikus bevitel gömbön keresztül">
              <Knob value={num} onChange={(e)=>setNum(e.value)} min={0} max={100} />
            </Playground>
          </div>
        )}

        {/* ===== SELECTION TAB ===== */}
        {activeTab === "selection" && (
          <div className="space-y-6">
            <Playground
              title="Lenyitható Lista"
              description="Opcióból kiválasztás - próbáld ki a lekerekítés és méret élő módosítását"
              controls={[
                { prop: "radius", label: "Lekerekítés", options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"], default: "xl" },
                { prop: "size", label: "Méret", options: ["small", "normal", "large"], default: "normal" },
              ]}
              render={(v) => (
                <Dropdown value={city} onChange={(e)=>setCity(e.value)} options={cities} optionLabel="name" placeholder="Válassz várost..." radius={v.radius} size={v.size} className="w-full max-w-sm" />
              )}
              code={(v) => `<Dropdown options={cities} optionLabel="name" radius="${v.radius}" size="${v.size}" />`}
            />

            <Playground title="Automatikus Kiegészítés" description="Javaslatokkal dolgozó input">
              <AutoComplete 
                value={acValue} 
                suggestions={cities.map(c=>c.name).filter(n=>n.toLowerCase().includes((acValue||'').toLowerCase()))} 
                onChange={(e)=>setAcValue(e.value)} 
                placeholder="Keresés…" 
                className="w-full max-w-sm" 
              />
            </Playground>

            <Playground title="Jelölőnégyzet" description="Logikai értékek választása">
              <div className="flex flex-col items-start gap-2">
                <label className="inline-flex items-center gap-2">
                  <Checkbox />
                  <span>Fogadok el</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <Checkbox />
                  <span>Marketing e-mailek</span>
                </label>
              </div>
            </Playground>

            <Playground title="Rádiógomb" description="Kizárólagos választás">
              <div className="flex flex-col items-start gap-2">
                <label className="inline-flex items-center gap-2">
                  <RadioButton inputId="opt1" name="options" value="a" onChange={(e)=>setRB(e.value)} checked={RB==="a"} />
                  <span>Opció A</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <RadioButton inputId="opt2" name="options" value="b" onChange={(e)=>setRB(e.value)} checked={RB==="b"} />
                  <span>Opció B</span>
                </label>
              </div>
            </Playground>

            <Playground title="Multi-Select" description="Több opció kiválasztása">
              <MultiSelect options={options} optionLabel="name" placeholder="Városok kiválasztása..." className="w-full max-w-sm" />
            </Playground>

            <Playground title="Jogi Statusz Jelölőnégyzet (Multi-State)" description="Három állapotú jelölőnégyzet">
              <MultiStateCheckbox
                options={[
                  { value: "elfogadva", icon: "pi pi-check" },
                  { value: "elutasitva", icon: "pi pi-times" },
                  { value: "folyamatban", icon: "pi pi-clock" },
                ]}
                optionValue="value"
              />
            </Playground>

            <Playground title="Háromállapotú Jelölőnégyzet" description="Háromállapotú kiválasztás">
              <TriStateCheckbox />
            </Playground>

            <Playground title="Listbox" description="Lista alapú kiválasztás">
              <Listbox options={cities} optionLabel="name" placeholder="Város kiválasztása" className="w-full max-w-sm" />
            </Playground>

            <Playground title="TreeSelect" description="Fa alapú kiválasztás">
              <TreeSelect placeholder="Válassz egy elemet" className="w-full" />
            </Playground>

            <Playground title="Fa Komponens" description="Fa szerkezetű adatok megjelenítésére">
              <Tree
                value={SZE_FA}
                expandedKeys={expandedKeys}
                onToggle={(e) => setExpandedKeys(e.value)}
              />
            </Playground>
          </div>
        )}

        {/* ===== DATE & TIME TAB ===== */}
        {activeTab === "datetime" && (
          <div className="space-y-6">
            <Playground title="Naptár - Egynap" description="Egyetlen nap kiválasztása">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
                placeholder="Válassz dátumot"
                inline
              />
            </Playground>

            <Playground title="Naptár - Tartomány" description="Dátumtartomány kiválasztása">
              <Calendar
                value={range}
                onChange={(e) => setRange(e.value)}
                selectionMode="range"
                showIcon
                showButtonBar
                placeholder="Válassz időszakot"
              />
            </Playground>

            <Playground title="Naptár - Idővel" description="Dátum és idő kiválasztása">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                hourFormat="24"
                showIcon
                placeholder="Dátum és idő"
                hideOnDateTimeSelect={false}
              />
            </Playground>

            <Playground title="Idő Választó" description="Idő kiválasztása">
              <TimePicker
                value={selectedTime}
                onChange={(value) => setSelectedTime(value)}
                timeOnly
                hourFormat="24"
                placeholder="Válassz időt"
              />
            </Playground>
          </div>
        )}

        {/* ===== ADVANCED TAB ===== */}
        {activeTab === "advanced" && (
          <div className="space-y-6">
            <Playground
              title="Dialog / Modal"
              description="Modal párbeszéd - próbáld ki a lekerekítés élő módosítását"
              controls={[
                { prop: "radius", label: "Lekerekítés", options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"], default: "3xl" },
              ]}
              render={(v) => (
                <div>
                  <Button label="Dialog Megnyitása" onClick={()=>setVisible(true)} />
                  <Dialog
                    header="Biztosan folytatod?"
                    visible={visible}
                    radius={v.radius}
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
              )}
              code={(v) => `<Dialog header="Biztosan folytatod?" radius="${v.radius}" ... />`}
            />

            <Playground title="Confirm Dialog" description="Megerősítésre kérő dialógus különböző típusokkal">
              <div className="space-y-3">
                <div>
                  <Button 
                    label="Info Megerősítés" 
                    onClick={() => setConfirmInfoVisible(true)}
                  />
                  <ConfirmDialog
                    visible={confirmInfoVisible}
                    title="Információ"
                    message="Ez egy információs megerősítési dialógus az SZE komponenssel."
                    icon="pi pi-info-circle"
                    severity="info"
                    confirmLabel="Értem"
                    cancelLabel="Bezárás"
                    onConfirm={() => {
                      console.log("Info megerősítve");
                      setConfirmInfoVisible(false);
                    }}
                    onCancel={() => setConfirmInfoVisible(false)}
                  />
                </div>

                <div>
                  <Button 
                    label="Figyelem - Megerősítés" 
                    variant="secondary"
                    onClick={() => setConfirmWarningVisible(true)}
                  />
                  <ConfirmDialog
                    visible={confirmWarningVisible}
                    title="Figyelem"
                    message="Biztos vagy a műveletben? Ez nem vonható vissza közvetlenül."
                    icon="pi pi-exclamation-triangle"
                    severity="warning"
                    confirmLabel="Igen, folytatom"
                    cancelLabel="Mégse"
                    onConfirm={() => {
                      console.log("Figyelmeztetés megerősítve");
                      setConfirmWarningVisible(false);
                    }}
                    onCancel={() => setConfirmWarningVisible(false)}
                  />
                </div>

                <div>
                  <Button 
                    label="Veszélyes Művelet" 
                    severity="danger"
                    onClick={() => setConfirmDangerVisible(true)}
                  />
                  <ConfirmDialog
                    visible={confirmDangerVisible}
                    title="Vigyázat - Veszélyes Művelet"
                    message="Ez a művelet véglegesen törli az adatokat. Tényleg folytatni szeretnéd?"
                    icon="pi pi-exclamation-circle"
                    severity="danger"
                    confirmLabel="Igen, törlés"
                    cancelLabel="Nem, mégse"
                    onConfirm={() => {
                      console.log("Veszélyes művelet megerősítve");
                      setConfirmDangerVisible(false);
                    }}
                    onCancel={() => setConfirmDangerVisible(false)}
                  />
                </div>
              </div>
            </Playground>

            <Playground title="Confirm PopUp" description="Kisebb popup megerősítések gombokhoz">
              <div className="space-y-6">
                {/* Info PopUp */}
                <div className="flex justify-center pt-12 pb-12 bg-gray-50 rounded-lg relative">
                  <Button
                    label="Info PopUp"
                    onClick={() => setPopupInfoVisible(!popupInfoVisible)}
                  />
                  {popupInfoVisible && (
                    <ConfirmPopUp
                      visible={popupInfoVisible}
                      message="Szeretnéd megtekinteni az információimat?"
                      icon="pi pi-info-circle"
                      severity="info"
                      confirmLabel="Igen"
                      cancelLabel="Mégse"
                      position="bottom"
                      onConfirm={() => {
                        console.log("Info PopUp megerősítve");
                        setPopupInfoVisible(false);
                      }}
                      onCancel={() => setPopupInfoVisible(false)}
                    />
                  )}
                </div>

                {/* Warning PopUp */}
                <div className="flex justify-center pt-12 pb-12 bg-gray-50 rounded-lg relative">
                  <Button
                    label="Figyelem PopUp"
                    severity="warning"
                    onClick={() => setPopupWarningVisible(!popupWarningVisible)}
                  />
                  {popupWarningVisible && (
                    <ConfirmPopUp
                      visible={popupWarningVisible}
                      message="Ez megváltoztat néhány beállítást. Folytatod?"
                      icon="pi pi-exclamation-triangle"
                      severity="warning"
                      confirmLabel="Igen, továbbmegyek"
                      cancelLabel="Mégsem"
                      position="top"
                      onConfirm={() => {
                        console.log("Warning PopUp megerősítve");
                        setPopupWarningVisible(false);
                      }}
                      onCancel={() => setPopupWarningVisible(false)}
                    />
                  )}
                </div>

                {/* Success PopUp */}
                <div className="flex justify-center pt-12 pb-12 bg-gray-50 rounded-lg relative">
                  <Button
                    label="Sikeres PopUp"
                    severity="success"
                    onClick={() => setPopupSuccessVisible(!popupSuccessVisible)}
                  />
                  {popupSuccessVisible && (
                    <ConfirmPopUp
                      visible={popupSuccessVisible}
                      message="Az intézmény sikeresen mentve."
                      icon="pi pi-check"
                      severity="success"
                      confirmLabel="OK"
                      cancelLabel="Bezár"
                      position="bottom"
                      onConfirm={() => {
                        console.log("Success PopUp megerősítve");
                        setPopupSuccessVisible(false);
                      }}
                      onCancel={() => setPopupSuccessVisible(false)}
                    />
                  )}
                </div>
              </div>
            </Playground>

            <Playground title="Menu" description="Menü navigáció gombokkal">
              <div className="space-y-6">
                {/* Popup Menu */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Popup Menü</h4>
                  <Menu
                    popup
                    label="Széchenyi Menü"
                    icon="pi pi-bars"
                    severity="primary"
                    items={[
                      { label: "🏫 Egyetem", icon: "pi pi-building", command: () => console.log("Egyetem") },
                      { label: "📚 Képzések", icon: "pi pi-book", command: () => console.log("Képzések") },
                      { label: "🔬 Kutatás", icon: "pi pi-search", command: () => console.log("Kutatás") },
                      { separator: true },
                      { label: "👥 Kapcsolat", icon: "pi pi-phone", command: () => console.log("Kapcsolat") },
                      { label: "📋 Jelentkezés", icon: "pi pi-file", command: () => console.log("Jelentkezés") },
                    ]}
                  />
                </div>

                {/* Multiple Menu Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Menu
                    popup
                    label="Intézet"
                    icon="pi pi-building"
                    severity="secondary"
                    items={[
                      { label: "Műszaki Intézet", command: () => console.log("Műszaki") },
                      { label: "Gazdasági Intézet", command: () => console.log("Gazdasági") },
                      { label: "Jogi Intézet", command: () => console.log("Jogi") },
                    ]}
                  />
                  <Menu
                    popup
                    label="Adminisztráció"
                    icon="pi pi-cog"
                    severity="primary"
                    items={[
                      { label: "Profil Beállítások", icon: "pi pi-user", command: () => console.log("Profil") },
                      { label: "Jogosultságok", icon: "pi pi-lock", command: () => console.log("Jogosultságok") },
                      { separator: true },
                      { label: "Kijelentkezés", icon: "pi pi-sign-out", command: () => console.log("Kijelentkezés") },
                    ]}
                  />
                  <Menu
                    popup
                    label="Segítség"
                    icon="pi pi-question-circle"
                    severity="info"
                    items={[
                      { label: "Rólunk", command: () => console.log("Rólunk") },
                      { label: "GYIK", command: () => console.log("GYIK") },
                      { label: "Támogatás", command: () => console.log("Támogatás") },
                    ]}
                  />
                </div>

                {/* Menu with Danger Severity */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Veszélyes Műveletek</h4>
                  <Menu
                    popup
                    label="Műveletek"
                    icon="pi pi-exclamation-triangle"
                    severity="danger"
                    items={[
                      { label: "Adatok Exportálása", icon: "pi pi-download", command: () => console.log("Export") },
                      { label: "Mentés Biztonsági Mentése", icon: "pi pi-save", command: () => console.log("Mentés") },
                      { separator: true },
                      { label: "Törlés", icon: "pi pi-trash", command: () => console.log("Törlés") },
                    ]}
                  />
                </div>
              </div>
            </Playground>

            <Playground title="Megamenu" description="Többoszlopos navigációs menü">
              <div className="space-y-6">
                {/* Academic Megamenu - Abbreviated for space */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Széchenyi Egyetem Megamenu</h4>
                  <Megamenu
                    items={[
                      {
                        label: "🏫 Oktatás",
                        icon: "pi pi-book",
                        items: [
                          {
                            label: "Alapképzések",
                            items: [
                              { label: "Informatika", command: () => console.log("Informatika") },
                              { label: "Mérnöki Tudományok", command: () => console.log("Mérnöki") },
                              { label: "Gazdaságtan", command: () => console.log("Gazdaságtan") },
                            ],
                          },
                          {
                            label: "Mesterképzések",
                            items: [
                              { label: "Mérnökinformatika", command: () => console.log("Mérnökinformatika") },
                              { label: "Üzletmenedzsment", command: () => console.log("Üzletmenedzsment") },
                            ],
                          },
                        ],
                      },
                      {
                        label: "🔬 Kutatás",
                        icon: "pi pi-search",
                        items: [
                          {
                            label: "Kutatási Intézetek",
                            items: [
                              { label: "Robotika Laboratorium", command: () => console.log("Robotika") },
                              { label: "AI és Gépi Tanulás", command: () => console.log("AI") },
                            ],
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </Playground>

            <Playground title="Menubar" description="Alkalmazás fejléc menüsáv">
              <div className="space-y-6">
                {/* Main Menubar */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Széchenyi Egyetem Menubar</h4>
                  <Menubar
                    items={[
                      {
                        label: "Kezdőlap",
                        icon: "pi pi-home",
                        command: () => console.log("Kezdőlap"),
                      },
                      {
                        label: "Oktatás",
                        icon: "pi pi-book",
                        items: [
                          { label: "Alapképzések", command: () => console.log("Alapképzések") },
                          { label: "Mesterképzések", command: () => console.log("Mesterképzések") },
                        ],
                      },
                      {
                        label: "Beállítások",
                        icon: "pi pi-cog",
                        items: [
                          { label: "Profil", command: () => console.log("Profil") },
                          { label: "Kijelentkezés", command: () => console.log("Kijelentkezés") },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </Playground>

            <Playground title="TieredMenu" description="Hierarchikus összevont menü">
              <TieredMenu
                items={[
                  {
                    label: "Fájl",
                    icon: "pi pi-fw pi-file",
                    items: [
                      { label: "Új", icon: "pi pi-fw pi-plus" },
                      { label: "Megnyitás", icon: "pi pi-fw pi-external-link" },
                      { label: "Mentés", icon: "pi pi-fw pi-save" }
                    ]
                  },
                  {
                    label: "Szerkesztés",
                    icon: "pi pi-fw pi-pencil",
                    items: [
                      { label: "Másolás", icon: "pi pi-fw pi-copy" },
                      { label: "Törlés", icon: "pi pi-fw pi-trash" }
                    ]
                  },
                  {
                    label: "Nézet",
                    icon: "pi pi-fw pi-eye"
                  }
                ]}
              />
            </Playground>

            <Playground
              title="Message"
              description="Egyedi értesítési üzenetek - próbáld ki a lekerekítés élő módosítását"
              controls={[
                { prop: "radius", label: "Lekerekítés", options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"], default: "lg" },
              ]}
              render={(v) => (
                <div className="space-y-4">
                  {/* Info Message */}
                  <Message
                    severity="info"
                    title="Információ"
                    text="A Széchenyi István Egyetem Magyarország egyik legrangosabb műszaki egyeteme."
                    radius={v.radius}
                    closable
                  />

                  {/* Success Message */}
                  <Message
                    severity="success"
                    title="Sikeres Operáció"
                    text="A hallgató sikeresen regisztrálva lett a képzésre."
                    icon="pi pi-check"
                    radius={v.radius}
                    closable
                  />

                  {/* Warning Message */}
                  <Message
                    severity="warning"
                    title="Figyelmeztetés"
                    text="Az adatmódosítások 24 óra múlva lépnek érvénybe."
                    radius={v.radius}
                    closable
                  />

                  {/* Error Message */}
                  <Message
                    severity="error"
                    title="Hiba"
                    text="Az alkalmazás feldolgozása sikertelen. Kérjük próbálja újra később."
                    radius={v.radius}
                    closable
                  />
                </div>
              )}
              code={(v) => `<Message severity="info" title="Információ" text="..." radius="${v.radius}" closable />`}
            />

            <Playground title="Messages" description="Több üzenet kezelése">
              <div className="space-y-6">
                {/* Message List Demo */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      label="Info Hozzáadása"
                      severity="secondary"
                      onClick={() => {
                        setMessages([
                          ...messages,
                          { severity: 'info', title: 'Info', text: 'Ez egy információs üzenet.' }
                        ]);
                      }}
                    />
                    <Button
                      label="Success Hozzáadása"
                      severity="success"
                      onClick={() => {
                        setMessages([
                          ...messages,
                          { severity: 'success', title: 'Siker', text: 'A műveletet sikeresen végrehajtva.' }
                        ]);
                      }}
                    />
                    <Button
                      label="Error Hozzáadása"
                      severity="danger"
                      onClick={() => {
                        setMessages([
                          ...messages,
                          { severity: 'error', title: 'Hiba', text: 'Valami hiba történt!' }
                        ]);
                      }}
                    />
                    <Button
                      label="Összes Törlése"
                      outlined
                      onClick={() => setMessages([])}
                    />
                  </div>

                  {/* Messages Container */}
                  {messages.length > 0 && (
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      {messages.map((msg, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div
                            className={`flex-1 p-3 rounded-lg border-l-4 ${
                              msg.severity === 'info'
                                ? 'bg-blue-50 border-blue-500 text-blue-800'
                                : msg.severity === 'success'
                                ? 'bg-green-50 border-green-500 text-green-800'
                                : 'bg-red-50 border-red-500 text-red-800'
                            }`}
                          >
                            {msg.title && (
                              <p className="font-semibold mb-1">{msg.title}</p>
                            )}
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <IconButton
                            icon="pi pi-times"
                            text
                            size="small"
                            className="shrink-0"
                            onClick={() => {
                              const newMessages = messages.filter((_, i) => i !== index);
                              setMessages(newMessages);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Playground>

            <Playground title="Toast" description="Értesítési toast üzenetek">
              <div className="flex gap-2">
                <Button label="Info Toast" onClick={() => {}} />
                <Button label="Siker Toast" severity="success" onClick={() => {}} />
                <Button label="Figyelem Toast" severity="warning" onClick={() => {}} />
              </div>
            </Playground>

            <Playground title="Tooltip" description="Hover tooltip tájékoztatás">
              <div className="flex gap-4">
                <Tooltip content="Ez egy tooltip">
                  <span className="text-sze-primary cursor-help">Mutass rá</span>
                </Tooltip>
                <Tooltip content="Másik tooltip" position="bottom">
                  <span className="text-sze-secondary cursor-help">Lent</span>
                </Tooltip>
              </div>
            </Playground>
          </div>
        )}

        {/* ===== LAYOUT & FORMA TAB ===== */}
        {activeTab === "layout" && (
          <div className="space-y-6">
            <Playground title="Accordion" description="Kiterjeszthető szekciók az SZE információival">
              <Accordian items={accordianItems} />
            </Playground>

            <Playground
              title="Avatar"
              description="Felhasználói profilképek több méretben és formában - próbáld ki a méret és forma élő módosítását"
              controls={[
                { prop: "size", label: "Méret", options: ["small", "normal", "large", "xlarge"], default: "normal" },
                { prop: "shape", label: "Forma", options: ["circle", "square"], default: "circle" },
              ]}
              render={(v) => (
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size={v.size} shape={v.shape} label="JD" />
                    <span className="text-xs text-gray-600">Betűjel</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size={v.size} shape={v.shape} icon="pi pi-user" />
                    <span className="text-xs text-gray-600">Ikon</span>
                  </div>
                </div>
              )}
              code={(v) => `<Avatar size="${v.size}" shape="${v.shape}" label="JD" />`}
            />

            <Playground title="Breadcrumb" description="Navigációs útvonal az aktuális oldal helyzetének mutatására">
              <div className="space-y-4">
                <Breadcrumb items={breadcrumbItems} />
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <p>A Breadcrumb komponens segít a felhasználóknak megérteni a hierarchikus navigációt.</p>
                </div>
              </div>
            </Playground>

            <Playground
              title="Card"
              description="Tartalom megjelenítésére szolgáló komponens - próbáld ki a lekerekítés és árnyék élő módosítását"
              controls={[
                { prop: "radius", label: "Lekerekítés", options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"], default: "2xl" },
                { prop: "shadow", label: "Árnyék", options: ["sm", "base", "md", "lg", "xl", "2xl"], default: "md" },
              ]}
              render={(v) => (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      title="Alapszintű Card"
                      subtitle="Fejléc és tartalom"
                      radius={v.radius}
                      shadow={v.shadow}
                    >
                      <p className="text-gray-700">
                        Ez egy egyszerű card komponens, amely közös tartalmak megjelenítésére szolgál.
                      </p>
                    </Card>

                    <Card
                      title="Card Footer-rel"
                      subtitle="Fejléc, tartalom és lábléc"
                      radius={v.radius}
                      shadow={v.shadow}
                      footer={
                        <div className="flex gap-2 justify-end">
                          <Button label="Mégsem" variant="outline" size="small" />
                          <Button label="OK" size="small" />
                        </div>
                      }
                    >
                      <p className="text-gray-700 mb-3">
                        Ez a card tartalmaz egy lábléchez, amely gombokat vagy egyéb elemeket tartalmazhat.
                      </p>
                    </Card>
                  </div>

                  <Card
                    title="Széchenyi István Egyetem"
                    subtitle="Guido Estathé és Tudás Központja"
                    radius={v.radius}
                    shadow={v.shadow}
                  >
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        A Széchenyi István Egyetem (SZE) Magyarország egyik vezető felsőoktatási intézménye.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-sze-primary-100 text-sze-primary rounded-full text-sm">📚 Oktatás</span>
                        <span className="px-3 py-1 bg-sze-secondary-100 text-sze-secondary rounded-full text-sm">🔬 Kutatás</span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              code={(v) => `<Card title="Alapszintű Card" subtitle="Fejléc és tartalom" radius="${v.radius}" shadow="${v.shadow}">...</Card>`}
            />

            <Playground
              title="Chip"
              description="Kis tagok, kategóriák és státuszok megjelenítésére - próbáld ki a lekerekítés élő módosítását"
              controls={[
                { prop: "radius", label: "Lekerekítés", options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"], default: "full" },
              ]}
              render={(v) => (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sze-primary mb-2">Alapszintű Chipek</h4>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="React" icon="pi pi-star" severity="primary" radius={v.radius} />
                      <Chip label="JavaScript" severity="secondary" radius={v.radius} />
                      <Chip label="Tailwind CSS" severity="success" radius={v.radius} />
                      <Chip label="UI Library" severity="warning" radius={v.radius} />
                      <Chip label="Component" severity="danger" radius={v.radius} />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sze-primary mb-2">Eltávolítható Chipek</h4>
                    <div className="flex flex-wrap gap-2">
                      {chips.map((chip) => (
                        <Chip
                          key={chip.id}
                          label={chip.label}
                          severity={chip.severity}
                          radius={v.radius}
                          closable
                          onClose={() => setChips(chips.filter(c => c.id !== chip.id))}
                        />
                      ))}
                    </div>
                    {chips.length === 0 && (
                      <p className="text-gray-500 text-sm">Nincs chip. Kattintsd meg az X gombot az eltávolításához!</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-sze-primary mb-2">Ikones Chipek</h4>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Felhasználó" icon="pi pi-user" severity="primary" radius={v.radius} />
                      <Chip label="Beállítások" icon="pi pi-cog" severity="secondary" radius={v.radius} />
                      <Chip label="Sikeres" icon="pi pi-check" severity="success" radius={v.radius} />
                      <Chip label="Figyelem" icon="pi pi-exclamation-triangle" severity="warning" radius={v.radius} />
                      <Chip label="Hiba" icon="pi pi-times" severity="danger" radius={v.radius} />
                    </div>
                  </div>
                </div>
              </div>
              )}
              code={(v) => `<Chip label="React" icon="pi pi-star" severity="primary" radius="${v.radius}" />`}
            />

            <Playground title="Divider" description="Tartalom szétválasztó komponens">
              <div className="space-y-6">
                {/* Horizontal Divider */}
                <div>
                  <h4 className="font-semibold text-sze-primary mb-3">Horizontal Divider</h4>
                  <div>
                    <p className="text-gray-700 mb-2">Tartalom fölött</p>
                    <Divider />
                    <p className="text-gray-700 mb-2">Tartalom között</p>
                    <Divider type="dashed" />
                    <p className="text-gray-700">Tartalom alatt</p>
                  </div>
                </div>

                {/* Horizontal Divider with Text */}
                <div>
                  <h4 className="font-semibold text-sze-primary mb-3">Divider szöveggel</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-700 mb-2">Széchenyi István Egyetem</p>
                      <Divider align="center">VAGY</Divider>
                      <p className="text-gray-700 mt-2">Más intézmény</p>
                    </div>
                  </div>
                </div>

                {/* Types */}
                <div>
                  <h4 className="font-semibold text-sze-primary mb-3">Divider típusok</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm mb-1 text-gray-600">Solid</p>
                      <Divider type="solid" />
                    </div>
                    <div>
                      <p className="text-sm mb-1 text-gray-600">Dashed</p>
                      <Divider type="dashed" />
                    </div>
                  </div>
                </div>
              </div>
            </Playground>

            <Playground title="FieldSet" description="Form mezők csoportosítása">
              <div className="space-y-4">
                {/* Basic FieldSet */}
                <FieldSet legend="Alapvető Információk">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Intézmény Neve
                      </label>
                      <InputText 
                        placeholder="Széchenyi István Egyetem" 
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Város
                      </label>
                      <InputText 
                        placeholder="Győr" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </FieldSet>

                {/* FieldSet with Multiple Fields */}
                <FieldSet legend="Kapcsolat Adatok">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <InputText 
                        placeholder="contact@sze.hu" 
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <InputText 
                        placeholder="+36 96 613 000" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </FieldSet>

                {/* Toggleable FieldSet */}
                <FieldSet legend="Haladó Beállítások" toggleable>
                  <div className="flex flex-col items-start gap-3">
                    <label className="inline-flex items-center gap-2">
                      <Checkbox />
                      <span className="text-gray-700">Nyilvános profil</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <Checkbox />
                      <span className="text-gray-700">Hírlevél feliratkozás</span>
                    </label>
                  </div>
                </FieldSet>
              </div>
            </Playground>

            <Playground title="Gallery" description="Képgalériai megjelenítés">
              <div className="space-y-6">
                {/* Standard 3-column Gallery */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Széchenyi István Egyetem - Kampusz Képek</h4>
                  <Gallery
                    items={[
                      {
                        src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=300&fit=crop",
                        title: "Campus Épület"
                      },
                      {
                        src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
                        title: "Tantermek"
                      },
                      {
                        src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
                        title: "Könyvtár"
                      },
                      {
                        src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
                        title: "Labor"
                      },
                    ]}
                    columns={3}
                    gap={4}
                  />
                </div>
              </div>
            </Playground>

            <Playground title="Inplace" description="Szerkeszthető szöveg megjelenítés">
              <div className="space-y-6">
                {/* Basic Inplace */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Intézmény Neve</h4>
                  <Inplace
                    value={inplaceValue}
                    onChange={setInplaceValue}
                    onSave={(val) => {
                      setInplaceValue(val);
                      console.log("Mentve:", val);
                    }}
                    placeholder="Szerkesztéshez kattintson"
                    label="Intézmény"
                  />
                </div>

                {/* Inplace Description */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Helyszín/Város</h4>
                  <Inplace
                    value={inplaceDescription}
                    onChange={setInplaceDescription}
                    onSave={(val) => {
                      setInplaceDescription(val);
                      console.log("Helyszín mentve:", val);
                    }}
                    placeholder="Kattintson szerkesztéshez"
                    label="Helyszín"
                  />
                </div>
              </div>
            </Playground>

            <Playground title="Paginator" description="Oldalazás komponens">
              <Paginator
                first={paginatorFirst}
                rows={paginatorRows}
                totalRecords={100}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onPageChange={(e) => {
                  setPaginatorFirst(e.first);
                  setPaginatorRows(e.rows);
                }}
              />
            </Playground>

            <Playground title="Panel" description="Kiterjeszthető panel komponens">
              <Panel header="Panel Fejléc" toggleable>
                <p className="text-gray-700">Ez a panel tartalma. Kiterjeszthető és összecsukható.</p>
              </Panel>
            </Playground>

            <Playground title="ProgressBar" description="Haladási sáv komponens">
              <div className="space-y-4">
                <div>
                  <ProgressBar value={progressValue} showValue />
                </div>
                <div className="flex gap-2">
                  <Button label="Előrelépés" onClick={() => setProgressValue(Math.min(100, progressValue + 10))} />
                  <Button label="Visszaállít" onClick={() => setProgressValue(0)} variant="outline" />
                </div>
              </div>
            </Playground>

            <Playground title="ProgressSpinner" description="Betöltési spinner">
              <div className="flex justify-center py-8">
                <ProgressSpinner strokeWidth={2} showLabel={true} label="Betöltés..." />
              </div>
            </Playground>

            <Playground title="ScrollPanel" description="Görgethető panel">
              <ScrollPanel height="300px">
                <div className="space-y-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="p-3 bg-sze-primary-50 rounded border border-sze-primary-200">
                      <h4 className="font-semibold text-sze-primary">Elem {i + 1}</h4>
                      <p className="text-sm text-gray-600">Ez egy görgethető panel tartalma.</p>
                    </div>
                  ))}
                </div>
              </ScrollPanel>
            </Playground>

            <Playground title="Sidebar" description="Oldalsáv navigáció">
              <div className="flex gap-3">
                <Button label="Nyitás" onClick={() => setSidebarVisible(true)} />
              </div>
              <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sze-primary">Menü</h3>
                  <div className="space-y-2">
                    <div className="px-3 py-2 hover:bg-white rounded cursor-pointer">Elem 1</div>
                    <div className="px-3 py-2 hover:bg-white rounded cursor-pointer">Elem 2</div>
                    <div className="px-3 py-2 hover:bg-white rounded cursor-pointer">Elem 3</div>
                  </div>
                </div>
              </Sidebar>
            </Playground>

            <Playground title="Skeleton" description="Betöltési placeholder">
              <Skeleton count={5} height="3rem" />
            </Playground>

            <Playground title="Stepper" description="Multi-step form">
              <Stepper
                steps={[
                  { label: "Lépés 1" },
                  { label: "Lépés 2" },
                  { label: "Lépés 3" }
                ]}
                activeStep={activeStep}
                onStepChange={setActiveStep}
              />
            </Playground>

            <Playground title="Steps" description="Lépés indikátor">
              <Steps
                items={[
                  { label: "Szállítás" },
                  { label: "Fizetés" },
                  { label: "Megerősítés" },
                  { label: "Kész" }
                ]}
                activeIndex={activeStepIndex}
                onSelect={setActiveStepIndex}
              />
            </Playground>

            <Playground title="TabMenu" description="Tab navigáció">
              <TabMenu
                items={[
                  { label: "Otthon", icon: "pi pi-home" },
                  { label: "Naptár", icon: "pi pi-calendar" },
                  { label: "Szerkesztés", icon: "pi pi-pencil" }
                ]}
                activeIndex={activeTabMenu}
                onTabChange={(e) => setActiveTabMenu(e.index)}
              />
            </Playground>

            <Playground title="Timeline" description="Esemény idővonal">
              <Timeline
                value={[
                  { title: "Projekt Kezdés", description: "Az projekt indítása", date: "2024.01.01", icon: "pi pi-check" },
                  { title: "Design Fázis", description: "UI/UX tervezés", date: "2024.02.01", icon: "pi pi-pencil" },
                  { title: "Fejlesztés", description: "Kódolás és implementáció", date: "2024.03.01", icon: "pi pi-code" },
                  { title: "Testing", description: "QA és tesztelés", date: "2024.04.01", icon: "pi pi-check-circle" }
                ]}
              />
            </Playground>

            <Playground title="Értékelés" description="Csillag értékelés komponens">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Rating value={rating} onChange={(e)=>setRating(e.value)} cancel={false} />
                  <span className="text-sm text-gray-600">({rating} csillag)</span>
                </div>
              </div>
            </Playground>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-16 pt-8 border-t border-gray-300 text-center text-gray-600">
          <p className="mb-2">SZE UI Component Library v1.0</p>
          <p className="text-sm">Powered by React, PrimeReact & Tailwind CSS</p>
          <a
            href="https://github.com/kovacsben/sze-university-ui"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-sze-primary hover:text-sze-secondary-600 transition-colors"
          >
            <i className="pi pi-github" aria-hidden="true"></i>
            GitHub repository
          </a>
        </div>
      </div>
    </div>
  );
}
