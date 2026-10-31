import React from "react";
import TailwindDemo from "./TailwindDemo";
import ExampleList from "./components/ExampleList";
import { TABS } from "./examples";

/**
 * A bemutató alkalmazás váza: fejléc, fülek, lábléc.
 *
 * A példák nem itt vannak, hanem példánként egy-egy fájlban az src/examples
 * alatt (lásd src/examples/index.js). Így a megjelenített kód és a futó kód
 * ugyanaz a fájl, és ez a fájl rövid marad.
 */

function TabButton({ id, label, icon, activeTab, onSelect }) {
  return (
    <button
      onClick={() => onSelect(id)}
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
}

export default function App() {
  const [activeTab, setActiveTab] = React.useState("buttons");
  const tab = TABS.find((t) => t.id === activeTab);

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
          {TABS.map((t) => (
            <TabButton key={t.id} {...t} activeTab={activeTab} onSelect={setActiveTab} />
          ))}
          <TabButton id="tailwind" label="Tailwind Demo" icon="pi pi-palette" activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        {activeTab === "tailwind" ? <TailwindDemo /> : tab && <ExampleList examples={tab.examples} />}

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
