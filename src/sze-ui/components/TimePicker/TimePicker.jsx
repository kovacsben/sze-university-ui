import React from "react";
import { classNames } from "primereact/utils";
import { Button } from "../Button";
import { InputText } from "../Input";
import { SelectButton } from "../SelectButton";
import { RADIUS, SHADOW, DURATION, controlSize } from "../../theme/tokens";

/**
 * SZE TimePicker – saját időválasztó
 *
 * A felület a könyvtár saját komponenseiből épül, így a többi kontrollal
 * együtt változik: a léptetők a SZE Button `text` variánsa, az értékmezők
 * SZE InputText-ek, a 12 órás napszakváltó SZE SelectButton, a Mégse/OK
 * pedig `outline` és alap Button. A nyitógomb a Dropdown gyökerének
 * osztályait követi (magasság, keret, hover, fókuszgyűrű), a panel a
 * Dropdown panelét – így a két legördülő kontroll egymás mellett egyforma.
 *
 * Ugyanezt a léptető + értékdoboz elrendezést kapja a Calendar beépített
 * időválasztója is (theme/pt/calendar.js), hogy a kettő egységes legyen.
 *
 * Az érték mindig 24 órás "HH:mm" vagy "HH:mm:ss" string, 12 órás
 * megjelenítésnél is – a formátum csak a kijelzést befolyásolja.
 *
 * @param {string}   value       - kontrollált érték ("HH:mm[:ss]"); undefined esetén kontrollálatlan
 * @param {string}   defaultValue - kezdőérték kontrollálatlan módban
 * @param {Function} onChange    - onChange(timeString), az OK gombra hívódik
 * @param {"24"|"12"} hourFormat - a Calendarral egyező nevű formátum-prop
 * @param {"24h"|"12h"} format   - régi név, a hourFormat felülírja
 * @param {boolean}  showSeconds
 * @param {string}   size        - CONTROL_SIZE kulcs vagy PrimeReact alias (small/large)
 * @param {string}   radius      - RADIUS kulcs, alapértelmezés: xl (mint a Dropdown)
 */

const pad = (n) => String(n).padStart(2, "0");
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
// Körbeforgó léptetés: 23 után 0, 0 előtt 59 stb. (max kizárólagos)
const wrap = (n, max) => ((n % max) + max) % max;

function parseTime(value) {
  const [h = 0, m = 0, s = 0] = (value || "").split(":").map((x) => parseInt(x, 10) || 0);
  return { h: clamp(h, 0, 23), m: clamp(m, 0, 59), s: clamp(s, 0, 59) };
}

function formatTime({ h, m, s }, showSeconds) {
  return showSeconds ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}`;
}

/**
 * Gépelt szövegből szám: csak a számjegyek utolsó két karaktere számít.
 * Így a kijelölt "00" mezőbe "1", majd "5" gépelve 01 -> 15 lesz, mint egy
 * digitális órán, és a kurzor helyzetével sem kell foglalkozni.
 */
const lastTwoDigits = (text) => parseInt(text.replace(/\D/g, "").slice(-2), 10) || 0;

/** Egy oszlop: felirat, fel-léptető, értékmező, le-léptető. */
function Spinner({ id, label, display, onStep, onType }) {
  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onStep(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onStep(-1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <Button
        type="button"
        variant="text"
        icon="pi pi-chevron-up"
        size="small"
        radius="full"
        aria-label={`${label} növelése`}
        onClick={() => onStep(1)}
      />
      {/* Az InputText PT-je w-full, ezért a szélességet a burkoló adja. */}
      <div className="w-14">
        <InputText
          id={id}
          value={display}
          radius="xl"
          inputMode="numeric"
          autoComplete="off"
          className="text-center text-lg font-semibold text-sze-primary tabular-nums"
          onFocus={(e) => e.target.select()}
          onChange={(e) => onType(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
      <Button
        type="button"
        variant="text"
        icon="pi pi-chevron-down"
        size="small"
        radius="full"
        aria-label={`${label} csökkentése`}
        onClick={() => onStep(-1)}
      />
    </div>
  );
}

/** A ":" elválasztó, az értékmezők vonalában (felirat + léptető helyét kihagyva). */
function Separator() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-1">
      <span className="invisible text-xs">:</span>
      <span className="h-9" />
      <span className="flex h-10 items-center text-lg font-semibold text-sze-primary">:</span>
    </div>
  );
}

const TimePicker = ({
  value,
  defaultValue = null,
  onChange = null,
  hourFormat,
  format = "24h",
  showSeconds = false,
  size,
  radius,
  disabled = false,
  className = "",
  placeholder = "Válassz időt",
}) => {
  const is12h = hourFormat ? String(hourFormat) === "12" : format === "12h";

  // Kontrollálatlan módban (nincs value prop) saját állapotban tartjuk az értéket.
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : innerValue;

  const [open, setOpen] = React.useState(false);
  // A panelen szerkesztett, még el nem fogadott érték (24 órás számokként).
  const [draft, setDraft] = React.useState(() => parseTime(current));

  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const uid = React.useId();
  const panelId = `${uid}-panel`;
  const fieldId = (key) => `${uid}-${key}`;

  const openPanel = () => {
    setDraft(parseTime(current));
    setOpen(true);
  };

  const close = React.useCallback((returnFocus) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Nyitáskor az óra mezőre kerül a fókusz (és ki is jelölődik).
  React.useEffect(() => {
    if (open) document.getElementById(fieldId("h"))?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Kattintás a komponensen kívül -> bezárás, mentés nélkül.
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  const accept = () => {
    const next = formatTime(draft, showSeconds);
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
    close(true);
  };

  const step = (key, delta) =>
    setDraft((d) => ({ ...d, [key]: wrap(d[key] + delta, key === "h" ? 24 : 60) }));

  const typeMinSec = (key) => (text) => setDraft((d) => ({ ...d, [key]: clamp(lastTwoDigits(text), 0, 59) }));

  // 12 órás módban a mező 1–12-t mutat, a belső érték 24 órás marad.
  const typeHour = (text) =>
    setDraft((d) => {
      const n = lastTwoDigits(text);
      if (!is12h) return { ...d, h: clamp(n, 0, 23) };
      const h12 = clamp(n, 1, 12) % 12;
      return { ...d, h: h12 + (d.h >= 12 ? 12 : 0) };
    });

  const hourDisplay = (h) => pad(is12h ? h % 12 || 12 : h);
  const period = draft.h >= 12 ? "PM" : "AM";

  const triggerText = current
    ? (() => {
        const t = parseTime(current);
        const text = `${hourDisplay(t.h)}:${pad(t.m)}${showSeconds ? `:${pad(t.s)}` : ""}`;
        return is12h ? `${text} ${t.h >= 12 ? "PM" : "AM"}` : text;
      })()
    : placeholder;

  // A Dropdown-nal azonos alapmagasság (h-11), size prop-pal a közös skálára állítható.
  const heightCls = size ? controlSize(size).height : "h-11";
  const radiusCls = RADIUS[radius] ?? RADIUS.xl;

  return (
    <div
      ref={rootRef}
      className={classNames("relative w-full", className)}
      onKeyDown={(e) => {
        if (open && e.key === "Escape") {
          e.stopPropagation();
          close(true);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close(false) : openPanel())}
        className={classNames(
          `relative flex w-full ${heightCls} items-center ${radiusCls} border bg-white pl-4 pr-12 text-left`,
          `transition-all ${DURATION.normal} cursor-pointer hover:border-sze-primary/50`,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sze-secondary focus-visible:ring-offset-2",
          open ? "border-sze-primary/50" : "border-black/10",
          "disabled:pointer-events-none disabled:opacity-60"
        )}
      >
        <span className={classNames("flex-1 truncate font-medium tabular-nums", current ? "text-gray-700" : "text-gray-400")}>
          {triggerText}
        </span>
        <span
          aria-hidden="true"
          className={`absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center ${RADIUS.lg} text-sze-primary`}
        >
          <i className="pi pi-clock" />
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Időválasztó"
          className={`absolute left-0 top-full z-50 mt-2 w-max min-w-64 ${RADIUS.xl} border border-gray-100 bg-white p-4 ${SHADOW["2xl"]}`}
        >
          <div className="flex items-start justify-center gap-2">
            <Spinner
              id={fieldId("h")}
              label="Óra"
              display={hourDisplay(draft.h)}
              onStep={(d) => step("h", d)}
              onType={typeHour}
            />
            <Separator />
            <Spinner
              id={fieldId("m")}
              label="Perc"
              display={pad(draft.m)}
              onStep={(d) => step("m", d)}
              onType={typeMinSec("m")}
            />
            {showSeconds && (
              <>
                <Separator />
                <Spinner
                  id={fieldId("s")}
                  label="Mp"
                  display={pad(draft.s)}
                  onStep={(d) => step("s", d)}
                  onType={typeMinSec("s")}
                />
              </>
            )}
          </div>

          {is12h && (
            <SelectButton
              value={period}
              options={["AM", "PM"]}
              allowEmpty={false}
              size="small"
              className="mt-3 flex w-full"
              aria-label="Napszak"
              onChange={(e) => {
                if (!e.value || e.value === period) return;
                setDraft((d) => ({ ...d, h: (d.h + 12) % 24 }));
              }}
            />
          )}

          <div className="mt-4 flex gap-2">
            <Button type="button" label="Mégse" variant="outline" size="small" className="flex-1" onClick={() => close(true)} />
            <Button type="button" label="OK" size="small" className="flex-1" onClick={accept} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
