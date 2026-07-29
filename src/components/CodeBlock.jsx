import React from "react";

/**
 * Egyszerű, függőségmentes JSX-szintaxis-kiemelő a Playground "kód megjelenítése"
 * nézetéhez. Nem valódi parser - regex-alapú tokenizálás, csak a demo kódrészletek
 * (komponens-hívások) szemléltetéséhez elég.
 */
const TOKEN_REGEX =
  /(<\/?[A-Za-z][\w.]*)|([a-zA-Z_][\w-]*)(?==)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\{|\})|(\/>|>)/g;

const TOKEN_CLASS = {
  tag: "text-sky-400 font-semibold",
  attr: "text-amber-300",
  string: "text-emerald-300",
  brace: "text-gray-400",
  punct: "text-gray-400",
  plain: "text-gray-100",
};

function tokenize(code) {
  const tokens = [];
  let lastIndex = 0;
  let match;

  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: "plain" });
    }
    if (match[1]) tokens.push({ text: match[1], type: "tag" });
    else if (match[2]) tokens.push({ text: match[2], type: "attr" });
    else if (match[3]) tokens.push({ text: match[3], type: "string" });
    else if (match[4]) tokens.push({ text: match[4], type: "brace" });
    else if (match[5]) tokens.push({ text: match[5], type: "punct" });
    lastIndex = TOKEN_REGEX.lastIndex;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: "plain" });
  }
  return tokens;
}

export default function CodeBlock({ code }) {
  const tokens = React.useMemo(() => tokenize(code), [code]);

  return (
    <pre className="bg-gray-900 rounded-xl p-4 text-sm overflow-x-auto">
      <code className="font-mono whitespace-pre">
        {tokens.map((t, i) => (
          <span key={i} className={TOKEN_CLASS[t.type]}>
            {t.text}
          </span>
        ))}
      </code>
    </pre>
  );
}
