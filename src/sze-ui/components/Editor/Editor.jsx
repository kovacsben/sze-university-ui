import React from "react";
import { Editor as PEditor } from "primereact/editor";

// Alap SZE toolbar (Quill gombok) – szabadon bővítsd
const defaultToolbar = (
  <span className="ql-formats">
    <select className="ql-header" defaultValue="">
      <option value="1"></option>
      <option value="2"></option>
      <option value=""></option>
    </select>
    <button className="ql-bold" aria-label="Félkövér"></button>
    <button className="ql-italic" aria-label="Dőlt"></button>
    <button className="ql-underline" aria-label="Aláhúzás"></button>
    <button className="ql-link" aria-label="Hivatkozás"></button>
    <button className="ql-list" value="ordered" aria-label="Számozott"></button>
    <button className="ql-list" value="bullet" aria-label="Felsorolás"></button>
  </span>
);

/**
 * SZE Editor wrapper (PrimeReact Editor)
 *
 * Props:
 * - value: string (HTML)
 * - onChange?: (html, text, originalEvent) => void
 * - header?: ReactNode  (egyéni toolbar; ha nincs, defaultToolbar)
 * - readOnly?: boolean
 * - placeholder?: string
 * - fullWidth?: boolean
 * - height?: number | string  (pl. 320 vagy "20rem")
 * - className?: string
 * - ...további PrimeReact Editor props
 */
export default function Editor({
  value,
  onChange,
  header,
  readOnly,
  placeholder,
  fullWidth,
  height = 320,
  className,
  ...rest
}) {
  // PrimeReact onTextChange: e.htmlValue (HTML), e.textValue (plain)
  const handleTextChange = (e) => {
    onChange?.(e.htmlValue, e.textValue, e);
  };

  const style =
    typeof height === "number" ? { height: `${height}px` } : { height };

  return (
    <div className={fullWidth ? "w-full" : undefined}>
      <PEditor
        value={value}
        onTextChange={handleTextChange}
        headerTemplate={header ?? defaultToolbar}
        readOnly={readOnly}
        placeholder={placeholder}
        style={style}
        className={className}
        {...rest}
      />
    </div>
  );
}
