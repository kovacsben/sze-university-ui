# SZE UI – projekt-összefoglaló (szakdolgozat)

Ez a repó Kovács Benedek szakdolgozati projektje: **SZE UI**, a győri Széchenyi István Egyetem
arculatára szabott React komponenskönyvtár, valamint egy hozzá tartozó bemutató (showcase)
alkalmazás. A könyvtár a **PrimeReact** komponenseit használja „unstyled” módban, és a teljes
megjelenést **Tailwind CSS v4** osztályokkal adja meg a PrimeReact **Pass-Through (PT)**
mechanizmusán keresztül.

A dokumentum célja, hogy egy későbbi munkamenetben (pl. a szakdolgozat írásakor) kontextust adjon:
mi van a projektben, hogyan épül fel, és milyen döntések állnak mögötte. Az állapot
2026-10-07-i, az 5. pont (élő Playground) 2026-11-01-i; a kódban a megjegyzések és az
azonosítók magyarul vannak.

> **Kitöltendő (a repóból nem derül ki):** a szakdolgozat pontos címe, a konzulens neve, a
> hivatalos célkitűzés és a beadási határidő. Szakdolgozati szöveg írásakor ezeket kérdezd meg.

---

## 1. Technológiai stack

| Réteg | Eszköz | Verzió (telepített) | Szerep |
|---|---|---|---|
| UI könyvtár | React + ReactDOM | 19.1.1 | komponensmodell, hookok |
| Komponensalap | PrimeReact | 10.9.7 | viselkedés, akadálymentesség, billentyűzetkezelés – `unstyled: true` módban |
| Ikonok | PrimeIcons | ^7.0.0 | `pi pi-*` ikonosztályok |
| Stílus | Tailwind CSS (v4, CSS-first) | 4.1.12 | utility osztályok, `@theme` tokenek |
| CSS pipeline | PostCSS + `@tailwindcss/postcss` + autoprefixer | – | Tailwind feldolgozás |
| Rich text | Quill | 2.0.3 | a PrimeReact `Editor` motorja |
| Build / dev szerver | Vite + `@vitejs/plugin-react` | 7.1.2 | HMR, production build |
| Élő szerkesztő (csak demó) | sucrase / CodeMirror 6 (`@uiw/react-codemirror`) / `@tailwindcss/browser` | 3.35 / 4.25 / 4.1.12 | futásidejű JSX-fordítás, kódszerkesztő, Tailwind az iframe-előnézetben (lásd 5.) |
| Lint | ESLint 9 (flat config) + react-hooks + react-refresh | – | kódminőség |
| Betűtípus | Montserrat (Google Fonts) | – | címsor- és szövegtípus |

Nincs TypeScript (sima `.jsx`/`.js`), nincs tesztkeretrendszer, nincs router és nincs
állapotkezelő könyvtár – a demó egyetlen oldal, `useState`-alapú állapottal.

### Parancsok

```bash
npm run dev       # Vite dev szerver (alapértelmezés: http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # a build kiszolgálása
npm run lint      # ESLint
```

A build Windows alatt lefut, és az importútvonalak kis- és nagybetűre is pontosak, így Linuxon
is lefut (2026-11-01-én ellenőrizve). A fülek lusta chunkok; az induló JS kb. 345 kB (gzip kb.
101 kB), korábban 1,06 MB (gzip kb. 274 kB) volt. Két HTML-belépő van: `index.html` és `preview.html`.

---

## 2. Könyvtárszerkezet

```
sze-university-ui/
├─ index.html                 # Vite belépő HTML (#root)
├─ preview.html               # 2. belépő: az élő szerkesztő iframe-előnézete
├─ vite.config.js             # react plugin, '@' és 'sze-ui' alias, 2 belépő, optimizeDeps
├─ tailwind.config.js         # csak content-útvonalak; a tokenek az index.css @theme-ben vannak
├─ postcss.config.js
├─ eslint.config.js
├─ public/
│  ├─ vite.svg
│  └─ copy.html               # NEM a projekt része: különálló WebP-konvertáló segédoldal
├─ save.txt                   # jegyzet: a button.js PT egy régebbi változatának másolata
└─ src/
   ├─ main.jsx                # belépési pont: <SzeProvider><App/></SzeProvider>, CSS importok
   ├─ index.css               # Tailwind import, @theme tokenek, globális javítások (lásd 4.4)
   ├─ App.jsx                 # a bemutató váza: fejléc, lusta fülek, lábléc (~110 sor)
   ├─ App.css                 # Vite-sablonból maradt, nincs használatban
   ├─ TailwindDemo.jsx        # interaktív Tailwind-osztály oktatóoldal (8 kategória)
   ├─ examples/               # CSAK demó: 64 példa, példánként egy .jsx (lásd 5.)
   │  ├─ index.js             # fülregiszter (TABS, lusta load)
   │  ├─ defineExamples.js    # modul + ?raw párosítás, dev ellenőrzések
   │  ├─ adatok.js, controls.js
   │  └─ <fül>/index.js + <Név>.jsx
   ├─ preview/                # CSAK demó: az iframe-előnézet appja (main.jsx, PreviewApp.jsx)
   ├─ components/             # CSAK a demóhoz tartozik, nem része a könyvtárnak
   │  ├─ Playground.jsx       # élő, szerkeszthető bemutató kártya
   │  ├─ ExampleList.jsx      # egy fül kártyái
   │  ├─ CodeBlock.jsx        # függőség nélküli JSX-kiemelő (a szerkesztő fallbackja)
   │  └─ live/                # fordító, hibakezelés, szerkesztő, iframe-protokoll
   └─ sze-ui/                 # <-- MAGA A KOMPONENSKÖNYVTÁR
      ├─ index.js             # publikus barrel: SzeProvider, összes komponens, szePT
      ├─ provider/
      │  └─ SzeProvider.jsx   # PrimeReactProvider { unstyled: true, pt }
      ├─ theme/
      │  ├─ tokens.js         # központi design tokenek (Tailwind osztálynevek)
      │  └─ pt/               # komponensenkénti Pass-Through stílusfájlok (~47 db)
      │     └─ index.js       # a globális `pt` objektum összeállítása
      └─ components/
         ├─ index.js          # barrel: minden komponensmappa újraexportálása
         ├─ MenuParts.jsx, menuUtils.js  # a 3 saját menü közös részei (nem publikus)
         └─ <Név>/            # mappánként: <Név>.jsx + index.js (barrel export)
```

Import a könyvtárból mindig a barrelen át történik: `import { Button, Dialog } from "./sze-ui";`

---

## 3. Architektúra

### 3.1 Rétegek

```
App.jsx (demó)  ──>  src/sze-ui/index.js (barrel)
                         │
                         ├─ SzeProvider ──> PrimeReactProvider { unstyled: true, pt: basePt ⊕ felhasználói pt }
                         │                                              ▲
                         ├─ komponensek (wrapper / saját)               │
                         │      │                                       │
                         │      └─> PrimeReact komponens (unstyled) ────┘ a PT-ből kapja a className-eket
                         │
                         └─ theme/pt/*.js ──> theme/tokens.js ──> index.css @theme (színek, font)
```

1. **`index.css` `@theme` blokk** – a nyers design tokenek CSS-változóként (Tailwind v4 CSS-first
   megközelítés). Ebből generálódnak a `bg-sze-primary`, `text-sze-secondary-300` stb. osztályok.
2. **`theme/tokens.js`** – a geometriai/méret tokenek, kész Tailwind osztálynevekként.
3. **`theme/pt/*.js`** – komponensenként a PrimeReact belső részeinek (root, input, panel, item…)
   osztályai; a tokenekből építkeznek.
4. **`SzeProvider`** – globálisan bekapcsolja az unstyled módot, és átadja a PT objektumot.
   A felhasználó saját `pt` propja sekély (shallow) összefésüléssel felülírhatja az alapot.
5. **Komponensek** – a publikus API. Lásd a 3 típust lent.

### 3.2 PrimeReact unstyled mód + Pass-Through

- `unstyled: true` mellett a PrimeReact nem injektál saját CSS-t; csak a DOM-szerkezetet, a
  viselkedést és az ARIA-attribútumokat adja.
- A PT objektum kulcsai a PrimeReact komponensnevek (pl. `button`, `dropdown`, `calendar`).
  A PrimeReact a kulcsot `toFlatCase` szerint egyezteti a komponens belső nevével
  (`__TYPE`, pl. `'Accordion'` → `accordion`, `'ListBox'` → `listbox`).
- Egy PT szekció lehet statikus objektum (`{ className: "..." }`) vagy függvény, ami
  `({ props, state, context })`-et kap, így állapotfüggő stílus is írható (pl. `context.selected`,
  `context.checked`, `state.activeIndex`).
- A **saját, nem PrimeReact propok** (pl. `radius`, `size`) is eljutnak a PT-függvényekhez
  `props.radius` / `props.size` formában – így lehet a lekerekítést és a méretet propból
  vezérelni.
- Néhány komponens a globális PT helyett **helyi `pt` propot** ad át: `InputNumber`,
  `Knob`, `TriStateCheckbox`, `MultiStateCheckbox`.
- Az egyes PT-fájlok exportnevei vegyesek (`buttonPT`, `inputTextPT` … ill. `tree`, `menu`,
  `tabmenu`); a kulcsot a `theme/pt/index.js` rendeli hozzájuk.

### 3.3 Design tokenek

**Színek és betűtípus (`src/index.css` `@theme`):**

- `sze-primary` (#242943, sötét egyetemi kék) + `sze-primary-50 … -900` skála
- `sze-secondary` (#50ADC9, világoskék) + `sze-secondary-50 … -956` skála
- `sze-third` (#D9D9D9, semleges szürke)
- Karok színei: `sze-esk`, `sze-kgyk`, `sze-akmk`, `sze-dfk`, `sze-muk`, `sze-ak`, `sze-givk`,
  `sze-eekk`, `sze-ahjk`, valamint `sze-pink`
- Állapotszínek: `success` (#16a34a), `warning` (#f59e0b), `danger` (#dc2626)
- Betű: `font-sze-heading` / `font-sze-body` = Montserrat; a `h1–h6` alapstílusa is itt van
  (`@layer components`).

**Geometriai tokenek (`src/sze-ui/theme/tokens.js`):**

| Token | Kulcsok | Megjegyzés |
|---|---|---|
| `RADIUS` | none, sm, md, lg, xl, 2xl, 3xl, full | `rounded-*` |
| `RADIUS_R` | ugyanaz | csak jobb oldali ív (InputNumber gombjai) |
| `CONTROL_SIZE` | sm / md / lg | magasság + padding + betűméret (h-9/h-10/h-11) |
| `AVATAR_SIZE` | sm, md, lg, xl | |
| `FONT_SIZE`, `SHADOW`, `BORDER_WIDTH`, `DURATION` | | |
| `controlSize(size)`, `avatarSize(size)` | | a PrimeReact `small`/`large`/`xlarge` értékeit a token-kulcsokra képezik le, így a publikus API (`<Button size="small">`) nem tört el |

**Fontos szabály:** minden token **teljes, literál** Tailwind osztálynév. A Tailwind v4 a
forráskódot statikusan szkenneli; egy összefűzött osztálynév (pl. `` `rounded-${x}` ``) build
közben kimarad a generált CSS-ből. Ezért van pl. a `Gallery`-ben is kikeresőtábla a
`grid-cols-*` / `gap-*` osztályokra.

**`radius` propot támogat:** Button (alap: 3xl/pill), InputText (3xl), InputNumber (3xl),
Dropdown (xl), Dialog (3xl), Card (2xl), Chip (full), Message (lg).
**`size` propot támogat:** Button, SplitButton, SelectButton, ToggleButton, InputText,
Password, AutoComplete, Dropdown, MultiSelect, TreeSelect, Calendar, Avatar.

### 3.4 Globális CSS-javítások (`src/index.css`)

Az unstyled mód néhány helyen hiányos viselkedést hagy; ezeket a `@layer`-eken **kívüli**
szabályok javítják (a rétegezetlen szabályok a Tailwind utilities réteget is felülírják):

- **Natív input elrejtése** (`[data-pc-section="input"][type=checkbox|radio]`,
  `hiddeninput`, `sronlyaria`): screen-reader-only technika, így fókuszálható és akadálymentes
  marad.
- **Kattinthatóság:** Checkbox / RadioButton / TriStateCheckbox / ToggleButton gyökerén a
  PrimeReact nem kezel kattintást (styled módban egy átlátszó input fedi a dobozt). Itt egy
  `opacity: 0`, teljes felületű input pótolja – enélkül pl. a MultiSelect „összes kijelölése”
  négyzete nem működött.
- **Fókuszgyűrű** a látható dobozra (`input:focus-visible ~ [data-pc-section="box"]`).
- **InputNumber:** a belső input (a globális `inputtext` PT miatt) saját keretet kapna; itt
  semlegesítve, a keretet a burkoló adja.
- **InputGroup** (`.sze-inputgroup`): egységes magasság, csak a szélső elemek kerekítése,
  keret-átfedés (`margin-left: -1px`), fókuszált elem `z-index`-e, hover-emelés kikapcsolása.
- **FloatLabel** (`.sze-floatlabel`): a címke `:has()` szelektorokkal „úszik fel” fókusz vagy
  kitöltött állapot esetén.
- **IconField** (`.sze-iconfield`): ikonpozíció és input-padding.
- **ToggleButton** animációk (`toggle-checked` / `toggle-unchecked` keyframe-ek).
- **ProgressBar** csíkminta (`.sze-progress-stripes`), **ScrollPanel** rejtett sáv
  (`.p-scrollpanel-hidden`).
- **Mintaszabály:** a PrimeReact komponens saját `pt` propja alapból *felülírja* a globális PT
  azonos szekcióját (nem fűzi össze) - ezért adják a helyi pt-s komponensek a teljes PT-t.

### 3.5 Komponenstípusok

- **(W) Vékony wrapper** – 1–5 soros továbbítás a PrimeReact komponensre; a megjelenést
  teljesen a globális PT adja. Célja az egységes import-felület és a későbbi bővíthetőség.
- **(B) Bővített wrapper** – PrimeReact-alapú, de saját logikával: prop-leképezés
  (`variant` → `severity`/`outlined`/`text`/`link`), kontrollált/kontrollálatlan mód,
  magyar alapfeliratok, PrimeReact-hibák megkerülése.
- **(S) Saját komponens** – PrimeReact nélkül, tisztán React + Tailwind (pl. Card, Chip,
  Stepper, Megamenu, TimePicker, ConfirmDialog).

---

## 4. Komponenskatalógus (66 exportált komponens)

Jelmagyarázat: **W** = vékony wrapper, **B** = bővített wrapper, **S** = saját implementáció.
A PT oszlop a `theme/pt/` alatti fájlt jelöli (ha van és érvényesül).

### Gombok és akciók
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| Button | B | Button | button.js | `variant`: secondary/outline/text/link → PrimeReact propok; `severity`; `fullWidth`; `align="left"` (menüpontok, oldalsáv-navigáció); ikon-only felismerés; `radius`, `size` |
| IconButton | B | Button | button.js | csak ikon (`label={null}`) |
| ButtonGroup | S | – | – | `inline-flex gap-2` konténer |
| SplitButton | B | SplitButton | SplitButton.js | `variant` leképezés, menü `model`-lel; részleges kerekítés `!important`-tal |
| ToggleButton | W | ToggleButton | togglebutton.js | on/off felirattal, animációval |
| SelectButton | W | SelectButton | selectbutton.js | a szegmensek a Button `BUTTON_BASE`-ét és `buttonVariantClasses`-ét használják újra |
| Toolbar | S | – | – | ikon+felirat gombsor elválasztókkal, SZE `Button`-ből |

### Űrlap és bevitel
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| InputText | B | InputText | inputtext.js | `invalid` → `aria-invalid` + piros keret; `radius`, `size` |
| KeyFilteredInput | W | InputText | inputtext.js | `keyfilter` (int/num/regex) |
| Password | W | Password | password.js | |
| InputNumber | B | InputNumber | inputnumber.js (helyi pt) | `fullWidth`, +/– gombok a pill-íven belül |
| InputOtp | W | InputOtp | inputotp.js | többcellás kódmező |
| InputSwitch | W | InputSwitch | inputswitch.js | a kapcsológomb a `slider` `before:` pszeudo-eleme (nincs `handle` szekció) |
| InputGroup / InputGroupAddon | S | – | index.css | összefüggő kontrollsor (pl. bankkártya-adatok) |
| IconField / InputIcon | B | IconField / InputIcon | index.css | ikon az input bal/jobb oldalán (`position`) |
| FloatLabel | B | FloatLabel | index.css | `cloneElement`-tel `id` + `inputId` a gyereknek |
| Editor | B | Editor (Quill) | editor.js | magyar feliratú alap eszköztár, `onChange(html, text, e)`, `height` |
| Mention | W | Mention | mention.js | |
| Slider | W | Slider | slider.js | |
| Knob | B | Knob | knob.js (helyi pt) | saját pointer-capture alapú húzáskezelés (lásd 6.) |
| Rating | W | Rating | rating.js | |

### Kiválasztás
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| Dropdown | W | Dropdown | dropdown.js | alapmagasság h-11, `radius`, `size` |
| AutoComplete | W | AutoComplete | autocomplete.js | |
| Checkbox | B | Checkbox | checkbox.js | kontrollálatlan mód (`defaultChecked`) is |
| RadioButton | W | RadioButton | radiobutton.js | |
| MultiSelect | B | MultiSelect | multiselect.js | kontrollálatlan mód, `selectAllLabel="Összes kijelölése"` |
| TriStateCheckbox | B | TriStateCheckbox | tristatecheckbox.js (helyi pt) | kontrollálatlan mód, `label`; `onChange(value)` – nem eseményt ad! |
| MultiStateCheckbox | B | MultiStateCheckbox | multistatecheckbox.js (helyi pt) | ugyanaz, `options` kötelező |
| Listbox | W | ListBox | listbox.js | |
| TreeSelect | W | TreeSelect | treeselect.js | |
| Tree | B | Tree | tree.js | `selectionMode="single"` alapból; az eseményt változatlanul adja tovább |

### Dátum és idő
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| Calendar | B | Calendar | calendar.js | `appendTo="self"`, `fullWidth`; egynapos, tartomány, idővel |
| TimePicker | S | – | (timepicker.js nem érvényesül) | SZE Button/InputText/SelectButton-ből épül, a nyitómező a Dropdown-éval azonos; `hourFormat` "24"/"12", kontrollált/kontrollálatlan, `"HH:mm[:ss]"` stringet ad; a Calendar időválasztója (calendar.js PT) ugyanezt a léptető + értékdoboz mintát követi |

### Overlay és visszajelzés
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| Dialog | W | Dialog | dialog.js | `radius`; a `root` a doboz (háttér, ív, árnyék), a fejléc/lábléc szegély nélkül, a bezáró gomb a Button text variánsa |
| ConfirmDialog | S | – | – | saját modális ablak háttérrel, `severity` (info/success/warning/danger), SZE Button-ök |
| ConfirmPopUp | S | – | – | gomb melletti kis megerősítő buborék, `position` (top/bottom/left/right) |
| Toast | W | Toast | toast.js | `forwardRef`, a hívó `ref.current.show(...)`-val használja; minden propot továbbad (`position`, `appendTo` stb.); a súlyosság színes bal szegélyt és ikont ad |
| Tooltip | B | Tooltip | tooltip.js | `React.useId()`-vel generált célpont |
| Message | S | – | (message.js nem érvényesül) | `severity` info/success/warning/error, bezárható |
| Messages | B | Messages | message.js (`messages` kulcs) | helyi lista + „Összes törlése” gomb |
| Sidebar | B | Sidebar | sidebar.js | beúszás a PT `transition` kulcsával (oldalanként), elmosott háttér, SZE-kék fejlécsáv; `title`/`subtitle`/`header`, `footer`, `position`, `modal` |

### Navigáció és menük
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| Menu | B | Menu | menu.js | `popup` mód SZE Button nyitógombbal |
| Menubar | S | – | (menubar.js nem érvényesül) | logó (alapból SZE Avatar) + menüsor, kattintásra nyíló almenük, mobil hamburger nézet; SZE Button/Divider-ből (lásd `MenuParts.jsx`) |
| Megamenu | S | – | (megamenu.js nem érvényesül) | többoszlopos panel a teljes sáv alatt, kattintásra nyílik (nyitott állapotban hoverre vált); SZE Button/Divider-ből |
| TieredMenu | S | – | – | tetszőleges mélységű, oldalra nyíló almenük (hover, kattintás, →/←/Esc); SZE Button/Divider-ből |
| TabMenu | B | TabMenu | tabmenu.js | `items` vagy `model`; aktív fül jelölése `state.activeIndex` alapján |
| Breadcrumb | S | – | (breadcrumb.js nem érvényesül) | útvonal `<nav>`, gomb-elemekkel |
| Steps | S | – | – | egyszerű lépésjelző |
| Stepper | S | – | – | `<ol>`/`<button>` alapú, vízszintes/függőleges, feliratokkal, a11y |
| Paginator | B | Paginator | paginator.js | találatszám balra (`leftContent`), lapozógombok középen, „/ oldal” SZE Dropdown jobbra (`rightContent`); `showPageLinks` |

### Layout és tartalom
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| Card | S | – | tokens | tipográfiai hierarchia: `eyebrow` (kis nagybetűs címke) / `title` (xl, félkövér) / `subtitle` / törzs; `header`, `footer`, `radius`, `shadow` |
| Panel | B | Panel | panel.js | csukható, a teljes fejléc kattintható (a toggler `after:` rétege); kontrollált csak ha `onToggle` van; `footer` |
| FieldSet | S | – | – | natív `<fieldset>`/`<legend>`, `toggleable` gombbal |
| Accordian | B | Accordion + AccordionTab | accordion.js (`accordion` kulcs) | `items: [{header, content}]`; külön kártyás fülek, a nyitott fejléce kitöltött SZE-kék, nyíl a cím előtt |
| Divider | S | – | – | vízszintes/függőleges, solid/dashed/dotted, középső felirat |
| ScrollPanel | B | ScrollPanel | scrollpanel.js | `height`; saját (hoverre megjelenő) görgetősáv, a PrimeReact elrejtő elrendezése PT-ben pótolva |
| Gallery | S | – | – | rácsos képgaléria + lightbox (Esc, ←/→, háttérkattintás); `thumb` a rácsba, `src` a nagyítóba |
| Inplace | B | Inplace | inplace.js | kattintásra szerkeszthető szöveg, Mentés/Mégse |
| Avatar | W | Avatar | avatar.js | kép/ikon/monogram, `size`, `shape` |
| Chip | S | – | tokens | `severity`, `closable`, ikon/avatar |
| Timeline | B | Timeline | timeline.js | ikon balra (SZE kör + összekötő vonal), tartalomkártya mellette; `done: false` halvány jelölő |

### Állapot és betöltés
| Komponens | Típus | Alap | PT | Lényeg |
|---|---|---|---|---|
| ProgressBar | B | ProgressBar | progressbar.js (helyi pt: `progressBarPT()`) | `color` (token név → CSS-változó), `size`, `animated` (mozgó csíkok), `label`; az érték a sáv mellett |
| ProgressSpinner | B | ProgressSpinner | progressspinner.js | `size` (sm/md/lg), opcionális felirat; forgás + `spinner-dash` animáció |
| Skeleton | B | Skeleton | skeleton.js | `count`, `shape="circle"`, `size`; átfutó fény (`after:animate-shimmer`) |

---

## 5. A bemutató alkalmazás

### `src/App.jsx` (~110 sor)
- Fejléc: „SZE UI Component Library”, alatta „Széchényi István Egyetem • PrimeReact + Tailwind CSS”.
  Landmarkok: `<header>`, `<main>` (benne `<nav>` a fülgombokkal, `aria-pressed`), `<footer>`.
- **7 fül** (`activeTab` state): Gombok, Input Mezők, Kiválasztás, Dátum & Idő, Haladó,
  Layout & Forma, Tailwind Demo. A fülek listája az `src/examples/index.js`-ben (`TABS`) van.
- Minden fül **lusta chunk** (`React.lazy`): a fül példái, a `Playground` és a csak ott használt
  függőségek (pl. Quill) az első megnyitáskor töltődnek. Az alapértelmezett fül letöltése már a
  fő csomag kiértékelésekor indul.

### `src/examples/` – a példák (egyetlen igazságforrás)
- **Példánként egy `.jsx` fájl**, összesen 64: `src/examples/<fül>/<Név>.jsx`
  (`buttons` 8, `inputs` 10, `selection` 10, `datetime` 4, `advanced` 11, `layout` 21). Mindegyik
  önálló modul `export default function Pelda()`-val, és `import { … } from "sze-ui"` formában
  hivatkozik a könyvtárra (Vite-alias a `vite.config.js`-ben, pontos egyezésű regex).
- A fül `index.js`-e `import.meta.glob`-bal kétszer tölti be ugyanazokat a fájlokat: modulként
  (a Vite fordítja → `Component`) és `?raw`-ként (a fájl szövege → `code`). **A megjelenített és a
  futó kód ugyanannak a fájlnak a tartalma.** A `META` tömb adja a sorrendet, a címet, a leírást
  és a vezérlőket; a `defineExamples.js` párosít, normalizálja a CRLF-et, és dev módban
  figyelmeztet a hiányzó fájlra vagy META-ra, illetve ha a vezérlők alapértékei eltérnek a fájl
  literáljaitól.
- `adatok.js`: `SZE_KAROK` (karok és alapszakok: AHJK, GIVK, ÉÉKK, KGK, DFÁJK, AK, ESK, MK),
  `SZE_FA` és `expandableKeys()` – ebből épül a Fa példa (egyetem → kar → szak, nyitottan indul).
  `controls.js`: `radiusControl(default)`, `sizeControl(options, default)`.
- Az állapot a példákban helyben van (`useState`/`useRef`); a Toast példa ref-en át valódi
  értesítést mutat.

### `src/components/Playground.jsx` – élő, szerkeszthető kártya
API: `<Playground id title description code Component controls />` (az `ExampleList` adja át a
`defineExamples` kimenetét).
- **Eszközök minden kártyán:** „Kód szerkesztése” (`aria-expanded`/`aria-controls`),
  „Kód másolása” (Clipboard API + `textarea` fallback), „Visszaállítás” (ha a kód eltér az
  eredetitől), „módosítva” jelvény (kézi szerkesztésnél). Bejelentések `aria-live` régióban.
- **Osztott nézet:** balra CodeMirror 6 (JSX), jobbra az iframe-előnézet; `lg` alatt egymás alatt.
  Gépelés után 300 ms debounce. Előnézeti szélesség: Kitöltés (alap, egymás mellett) / Mobil
  375 px / Tablet 768 px / Asztali (teljes kártyaszélesség). A Tablet és az Asztali egymás alá
  rendez, mert fél szélességen az `md:`/`lg:` töréspontok nem érvényesülnének.
- **Rétegzett előnézet** (teljesítmény): eredeti kód → az előre fordított `Component` inline;
  csak vezérlő írta át → `LiveInline` (lusta sucrase) inline; kézi szerkesztés vagy nyitott
  szerkesztő → `PreviewFrame` (iframe).
- **Vezérlők** (8 kártya: Gomb variációk, Szöveg input, Lenyitható lista, Dialog, Message, Avatar,
  Card, Chip): a SelectButton-ök a kódstringet írják át – az `applyControls()` a vezérelt prop
  `prop="…"` literálját cseréli a kód minden előfordulásában, így kézi szerkesztés után is működik.
- A szerkesztések fülváltáskor megmaradnak (modulszintű `Map`), oldalújratöltéskor nem.
- Visszaállításkor és vezérlőváltáskor a szerkesztő újramountol (`key`): a `@uiw/react-codemirror`
  gépelés után egy időzítőig visszatartja a külső `value`-frissítést, ami a böngésző
  időzítő-korlátozása miatt jóval tovább tarthat 200 ms-nál.

### `src/components/live/` – a futtatómag
| Fájl | Szerep |
|---|---|
| `compile.js` | sucrase (`jsx` + `imports`) → `new Function`; `require`-shim: `react`, `sze-ui`, `../adatok`. Lusta. |
| `formatError.js`, `LiveErrorView.jsx` | magyar hibaüzenet: típus (szintaktikai / hiányzó modul / hiányzó export / futási), sor (szintaktikainál oszlop is), kódrészlet, az eredeti üzenet lenyitható részben |
| `sourceLocation.js` | futási hiba sora a stack `sze-pelda.jsx:L` mintájából (V8: −2 sor eltolás); külön modul, hogy a boundary ne húzza be a fordítót |
| `ExampleErrorBoundary.jsx` | példánkénti error boundary, kódváltozáskor újrapróbál |
| `LiveInline.jsx` | vezérlővel átírt kód inline futtatása |
| `LiveEditor.jsx` | CodeMirror (lusta chunk); `aria-label`, `aria-describedby`; Tab behúz, **Esc, majd Tab** kilép (a CodeMirror beépített viselkedése) |
| `PreviewFrame.jsx`, `previewProtocol.js` | iframe + `postMessage` (`ready`/`height`/`status` ↔ `render`), forrás- és origin-ellenőrzés, automatikus magasság, `VIEWPORTS` |

### Tailwind az előnézetben: `preview.html` + `src/preview/`
A szerkesztőben beírt új osztályokhoz build közben nem készül CSS (a Tailwind v4 statikusan
szkennel). Megoldás: az előnézet egy **külön Vite-belépő** (`preview.html` → `src/preview/main.jsx`
+ `PreviewApp.jsx`) iframe-ben, ahol a `@tailwindcss/browser` (a `tailwindcss`-szel egyező
4.1.12-es verzió) futásidőben generálja a hiányzó utility-ket.
- A tokenek egyetlen forrásból jönnek: az `index.css?raw` `@theme` blokkját kivágjuk, és
  `<style type="text/tailwindcss">`-ként injektáljuk; csak a `tailwindcss/theme` és a
  `tailwindcss/utilities` réteg készül (preflight nélkül, hogy ne duplikálódjon). A lefordított
  `index.css` is betöltődik (rétegen kívüli javítások, base/components réteg).
- Miért iframe: a böngészős fordító a teljes DOM-ot figyeli és CSS-t injektál – a főoldalon a
  könyvtár kaszkádját is befolyásolná; a PrimeReact overlayek a saját dokumentumukban maradnak; a
  mobil/tablet szélesség valódi viewport.
- A könyvtár CSS-e nem változott: a build-CSS-ből egyetlen szelektor sem tűnt el, csak a
  Playground-UI osztályai jöttek hozzá.

### `src/components/CodeBlock.jsx`
Függőség nélküli, regex-tokenizáló JSX-kiemelő. Most a szerkesztő Suspense-fallbackja, amíg a
CodeMirror chunk letöltődik.

### `src/TailwindDemo.jsx`
Oktató jellegű oldal a Tailwind alaposztályairól, 8 kategóriával: Spacing, Színek, Tipográfia,
Flexbox, Grid, Szegélyek & Sarkok, Árnyékok, Transzformációk. Minden példa mellett
ott az osztálynév.

### Mérések (2026-11-01, production build, headless Chrome)
| | előtte (main, 71ad185) | utána |
|---|---|---|
| induló JS (`index.html`) | 1060,7 kB (gzip 274,1 kB) | 344,7 kB (gzip 101,5 kB) |
| build-CSS | 107,07 kB | 108,83 kB (csak új demo-UI osztályok) |
| axe-core szabálysértő elemek (7 fül összesen) | 302 | 131 |
| FCP / első kártya, lassú 4G (1,6 Mbps, 150 ms RTT) | 1940 / 1961 ms | 1048 / 1641 ms |
| FCP / első kártya, localhost | ~330 / ~360 ms | ~270 / ~530 ms (több chunk, vízesés) |

A CodeMirror a `LiveEditor` chunkban, a sucrase a `compile` chunkban, a `@tailwindcss/browser`
(gzip ~69 kB) csak az iframe-ben töltődik. Az iframe-belépő (teljes könyvtár + Quill + sucrase)
gzip ~344 kB, csak szerkesztő megnyitásakor töltődik le.

---

## 6. Fontos tervezési döntések és megoldott problémák

A kódbeli megjegyzések részletesen dokumentálják ezeket. Jó anyag a szakdolgozat „Fejlesztés
során felmerült problémák” vagy „Implementáció” fejezetéhez.

1. **Unstyled + PT a téma-CSS helyett.** A PrimeReact viselkedése és akadálymentessége
   megmarad, a megjelenés viszont teljesen Tailwind-alapú és tokenekből vezérelt. Ára: az
   unstyled mód a PrimeReact saját CSS-ében lévő *funkcionális* szabályokat is elhagyja, ezeket
   pótolni kellett (lásd 3.4, illetve: ScrollPanel görgetés és saját sáv, Tree behúzás és
   levélelem-nyíl, Knob `fill: none`, TabMenu aktív fül jelölése, InputSwitch gomb, Timeline
   sor-elrendezés, Sidebar beúszás, ProgressSpinner szín és animáció, Skeleton hullám). Az
   animációk keyframe-jei az `index.css` `@theme` blokkjában vannak (`--animate-*`), így az élő
   előnézet iframe-je is megkapja őket.
2. **Egyetlen forrás a stílusokhoz.** A színek az `@theme`-ben, a geometria a `tokens.js`-ben;
   a `tailwind.config.js` szándékosan nem duplikálja őket. A SelectButton a Button
   `BUTTON_BASE` + `buttonVariantClasses` exportját használja újra, így a két komponens színei
   és méretei együtt változnak.
3. **Visszafelé kompatibilis méret-API.** `controlSize()` / `avatarSize()` aliasok a
   PrimeReact `small`/`large` értékeire.
4. **Knob – saját húzáskezelés.** A PrimeReact Knob `event.offsetX/Y`-ból számol, ami az SVG-n
   kívül hibás, ezért az érték „beragadt”. Megoldás: `readOnly`-val kikapcsolva a PrimeReact
   egérfigyelőit, a húzást pointer capture-rel és `getBoundingClientRect` alapú szögszámítással
   (`angleToValue`) kezeli a komponens; a holt zónát a közelebbi véghez illeszti; a billentyűzetes
   vezérlés és a `tabIndex` megmarad.
5. **Kontrollált/kontrollálatlan mód.** Checkbox, MultiSelect, TriStateCheckbox,
   MultiStateCheckbox önmagában, külső state nélkül is működik (`defaultChecked`/`defaultValue`).
6. **Panel:** a PrimeReact Panel kontrollálttá válik, ha `onToggle`-t kap; a wrapper csak
   akkor adja át, ha a hívó tényleg kezeli az állapotot. Korábban emiatt nem lehetett összecsukni.
7. **Tree:** a wrapper korábban `onToggle(event.value)`-t hívott, a hívó viszont `e.value`-t
   olvasott, ezért a fa nem volt kibontható. Most az eseményt változatlanul adja tovább.
8. **Nem-PrimeReact propok fordítása:** a Paginator `showPageLinks` → `template`, a ProgressBar
   `displayFormat` → `displayValueTemplate`. Korábban ezek a DOM-ig jutottak, és React-figyelmeztetést
   okoztak.
9. **InputGroup specificitási probléma.** A gyerekek saját PT-osztályai (pl. `rounded-3xl`,
   `h-11`) azonos specificitásúak voltak, mint amit a csoport hozzáfűzött volna, így a generált
   CSS sorrendje döntött. Megoldás: rétegen kívüli `.sze-inputgroup` szabályok az `index.css`-ben.
10. **Button ikon-középre igazítás:** a PrimeReact üres label `<span>`-t is renderel; a PT
    `hidden`-nel veszi ki a layoutból, ha nincs szöveg.
11. **Akadálymentesség:** Stepper `<ol>` + `<button>` + `aria-current="step"`, FieldSet valódi
    `<button>` + `aria-expanded`, Chip `aria-label`, a natív inputok screen-reader-only rejtése,
    `focus-visible` gyűrűk `sze-secondary` színnel.
12. **Magyar lokalizáció** a komponensek alapértékeiben (feliratok, Paginator riport,
    MultiSelect, ConfirmDialog „Igen/Nem”, Inplace „Mentés/Mégse”).

---

## 7. Ismert hiányosságok, technikai adósság

Ezek a kód átnézésekor derültek ki. Nem lettek javítva; dokumentáláskor jó tudni róluk.

- ~~`accordian` PT-kulcs~~ – javítva: a PT most `accordion` kulcson van (`theme/pt/accordion.js`).
  A komponens neve (`Accordian`) a publikus API miatt maradt.
- **Nem érvényesülő PT-fájlok:** `breadcrumb.js`, `menubar.js`, `megamenu.js`, `timepicker.js`
  és a `message.js` `message` kulcsa olyan komponensekhez tartozik, amelyek saját (nem PrimeReact)
  implementációk, így ezeket semmi nem olvassa.
- ~~`dialog.js` mask: hiányzó szóköz (`p-4bg-black/40`)~~ – javítva a Dialog PT átírásakor.
- ~~Kis- és nagybetű-eltérés az importútvonalakban~~ (`./FieldSet`, `./Sidebar`) – javítva (73c3aed).
- ~~A `TailwindDemo` kétszer renderelődött~~ – javítva az App.jsx átírásakor.
- ~~Toast megjelenés~~ – javítva: a `toast.js` PT a PrimeReact valódi szekcióneveit használja (szélesség,
  elrendezés, súlyossági színek, animáció); a `fixed` pozíciót a PrimeReact inline stílusa adja.
- **Élő szerkesztő:** a CodeMirror `.cm-scroller` eleme axe `scrollable-region-focusable`
  jelzést kap; minden újrafordítás új komponenstípust ad, ezért szerkesztéskor a példa állapota
  alaphelyzetbe áll; a futási hibák sorszáma V8-ra (Chrome, Edge) kalibrált.
- **`animate-fadeIn`** osztályt használ a ConfirmPopUp, de keyframe nincs hozzá (hatástalan);
  a meglévő megfelelője az `animate-fade-in`.
- **Következetlen színhasználat:** a Chip, a Message és a ConfirmDialog Tailwind alapszíneket
  (`green-*`, `yellow-*`, `red-*`) használ a `success`/`warning`/`danger` tokenek helyett.
- **API-eltérések:** a TriStateCheckbox és a MultiStateCheckbox `onChange`-e értéket ad, a
  többi komponensé eseményobjektumot.
- **Maradványfájlok:** üres `components/Upload/` mappa; a `README.md` a Vite-sablon
  alapszövege; az `index.html` címe „Vite + React” (`lang="en"`); a `src/App.css` nincs
  használatban; a `public/copy.html` nem kapcsolódik a projekthez; a `save.txt` jegyzet.
- **`.vscode/launch.json`** a 8080-as portra mutat, a Vite dev szerver alapból az 5173-on fut.
- Nincsenek automatizált tesztek a repóban, nincs TypeScript/PropTypes.
- A `dark:` variáns csak elszórtan szerepel; sötét téma nincs.

---

## 8. Git-előzmények

```
7a4fefe 2025-08-18  chore: initial commit (Vite + Tailwind + PrimeReact SZE UI)
0009fe0 2026-02-17  Add UI components: MultiSelect, RadioButton, Rating, Slider, ToggleButton, TreeSelect, TriStateCheckbox, Mention, Listbox, Password, SelectButton
1f87cfd 2026-03-26  push-old checkpoint
ae88561 2026-07-30  Update UI components and theme presets
0c35003 2026-10-31  Improve component library and demo UI   (a 6. pont javításai, CLAUDE.md)
71ad185 2026-10-31  Restore GitHub repository link
```

A `feature/live-playground` branch (2026-11-01) az élő Playgroundot adja hozzá (5. pont):
importútvonal-javítás, a példák kiszervezése, lusta fülek, futtatómag, iframe-előnézet,
szerkesztő és vezérlők, akadálymentességi javítások.

---

## 9. Javaslat a szakdolgozat felépítéséhez (a projekt alapján)

1. Bevezetés, motiváció: egységes egyetemi arculat a webes felületeken.
2. Irodalmi és technológiai áttekintés: komponenskönyvtárak és design systemek; React;
   PrimeReact styled és unstyled mód; Tailwind CSS v4 (utility-first, CSS-first `@theme`); Vite.
3. Tervezés: SZE arculati színek és tipográfia → design tokenek; komponens-taxonómia;
   architektúra (Provider → PT → tokenek).
4. Implementáció: PT minták (statikus és állapotfüggő), token-rendszer, wrapper-típusok,
   saját komponensek, globális CSS-javítások.
5. Problémák és megoldások (6. pont).
6. Bemutató alkalmazás: élő Playground (egyetlen igazságforrás, futásidejű fordítás, iframe +
   böngészős Tailwind), a vezérlők mint kódsablon-átírás, lusta betöltés és mérései.
7. Tesztelés és értékelés: jelenleg manuális, a demón keresztül.
8. Továbbfejlesztési lehetőségek: a 7. pont tételei, TypeScript, tesztek, Storybook, npm-csomag,
   sötét téma, kódszétválasztás.

## Konvenciók a kódban (ha módosítasz rajta)

- Új komponens: `src/sze-ui/components/<Név>/<Név>.jsx` + `index.js`
  (`export { default as <Név> } from "./<Név>.jsx";`), majd felvétel a `components/index.js`-be.
- Ha PrimeReact-alapú: PT-fájl a `theme/pt/`-ba, regisztrálás a `theme/pt/index.js`-ben a
  PrimeReact komponensnévvel egyező kulccsal.
- Stílusértékek a `tokens.js`-ből; mindig teljes, literál Tailwind osztálynevek.
- Megjegyzések magyarul, a döntések indoklásával (a kódbázis ezt a stílust követi).
- Új bemutató példa: `src/examples/<fül>/<Név>.jsx` (`export default function Pelda()`,
  importok csak `react`, `sze-ui`, `../adatok`), és egy sor a fül `index.js` META tömbjébe.
  Vezérlőnél a vezérelt prop literálként szerepeljen a fájlban, a `default`-tal egyező értékkel.
