import React, { useState } from "react";

export default function TailwindDemo() {
  const [activeCategory, setActiveCategory] = useState("spacing");

  const DemoBox = ({ code, children, fullWidth = false }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 font-mono text-sm text-gray-700 overflow-auto">
        {code}
      </div>
      <div className={`p-6 ${fullWidth ? "" : "flex items-center justify-center min-h-[150px]"}`}>
        {children}
      </div>
    </div>
  );

  const CategoryButton = ({ id, label }) => (
    <button
      onClick={() => setActiveCategory(id)}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        activeCategory === id
          ? "bg-blue-500 text-white shadow-md"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Tailwind CSS Demo</h1>
          <p className="text-xl text-gray-600">Interaktív útmutatás a leggyakoribb Tailwind CSS osztályokhoz</p>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          <CategoryButton id="spacing" label="Spacing (Padding/Margin)" />
          <CategoryButton id="colors" label="Színek" />
          <CategoryButton id="typography" label="Tipográfia" />
          <CategoryButton id="flexbox" label="Flexbox" />
          <CategoryButton id="grid" label="Grid" />
          <CategoryButton id="borders" label="Szegélyek & Sarkok" />
          <CategoryButton id="shadows" label="Árnyékok" />
          <CategoryButton id="transforms" label="Transzformációk" />
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          {/* SPACING */}
          {activeCategory === "spacing" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Spacing: Padding és Margin</h2>

              <DemoBox code="p-4 (padding: 1rem)">
                <div className="p-4 bg-blue-200 border-2 border-blue-400">
                  <span className="text-gray-800">p-4 = 1rem (16px) padding mind a 4 oldalon</span>
                </div>
              </DemoBox>

              <DemoBox code="px-6 py-3 (horizontal/vertical padding)">
                <div className="px-6 py-3 bg-purple-200 border-2 border-purple-400">
                  <span className="text-gray-800">px-6 (vízszintes) py-3 (függőleges)</span>
                </div>
              </DemoBox>

              <DemoBox code="m-2 (margin: 0.5rem)" fullWidth>
                <div className="flex gap-2 flex-wrap">
                  <div className="m-2 bg-green-200 border-2 border-green-400 px-4 py-2">m-2</div>
                  <div className="m-2 bg-green-200 border-2 border-green-400 px-4 py-2">m-2</div>
                  <div className="m-2 bg-green-200 border-2 border-green-400 px-4 py-2">m-2</div>
                </div>
              </DemoBox>

              <DemoBox code="mb-4 (margin-bottom: 1rem)" fullWidth>
                <div>
                  <div className="mb-4 bg-orange-200 border-2 border-orange-400 px-4 py-2">
                    Elem 1 - mb-4 (lent van hely)
                  </div>
                  <div className="bg-orange-200 border-2 border-orange-400 px-4 py-2">
                    Elem 2
                  </div>
                </div>
              </DemoBox>
            </>
          )}

          {/* COLORS */}
          {activeCategory === "colors" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Szín rendszer</h2>

              <DemoBox code="bg-blue-500 (háttér szín)" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-blue-100 p-4 rounded text-center font-semibold">bg-blue-100</div>
                  <div className="bg-blue-300 p-4 rounded text-center font-semibold">bg-blue-300</div>
                  <div className="bg-blue-500 p-4 rounded text-white text-center font-semibold">bg-blue-500</div>
                  <div className="bg-blue-700 p-4 rounded text-white text-center font-semibold">bg-blue-700</div>
                  <div className="bg-blue-900 p-4 rounded text-white text-center font-semibold">bg-blue-900</div>
                </div>
              </DemoBox>

              <DemoBox code="text-red-600 (szöveg szín)" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="text-red-300 font-bold text-lg">Piros 300</div>
                  <div className="text-red-600 font-bold text-lg">Piros 600</div>
                  <div className="text-red-900 font-bold text-lg">Piros 900</div>
                </div>
              </DemoBox>

              <DemoBox code="border-2 border-green-400 (szegély szín)" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="border-2 border-green-300 p-4 rounded">Green 300</div>
                  <div className="border-2 border-green-500 p-4 rounded">Green 500</div>
                  <div className="border-2 border-green-700 p-4 rounded">Green 700</div>
                </div>
              </DemoBox>
            </>
          )}

          {/* TYPOGRAPHY */}
          {activeCategory === "typography" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tipográfia</h2>

              <DemoBox code="text-xs (font size: 0.75rem)">
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Nagyon kicsi szöveg (text-xs)</span>
              </DemoBox>

              <DemoBox code="text-sm (font size: 0.875rem)">
                <span className="text-sm">Kicsi szöveg (text-sm)</span>
              </DemoBox>

              <DemoBox code="text-base (font size: 1rem) - alapértelmezett">
                <span className="text-base">Alapértelmezett szöveg (text-base)</span>
              </DemoBox>

              <DemoBox code="text-lg (font size: 1.125rem)">
                <span className="text-lg">Nagyobb szöveg (text-lg)</span>
              </DemoBox>

              <DemoBox code="text-2xl (font size: 1.5rem)">
                <span className="text-2xl">Még nagyobb (text-2xl)</span>
              </DemoBox>

              <DemoBox code="text-4xl (font size: 2.25rem)">
                <span className="text-4xl">Nagyon nagy (text-4xl)</span>
              </DemoBox>

              <DemoBox code="font-light / font-normal / font-bold / font-black" fullWidth>
                <div className="space-y-2">
                  <div className="font-light">Font Light - vékony betűk</div>
                  <div className="font-normal">Font Normal - alapértelmezett</div>
                  <div className="font-bold">Font Bold - félkövér</div>
                  <div className="font-black">Font Black - nagyon vastag</div>
                </div>
              </DemoBox>
            </>
          )}

          {/* FLEXBOX */}
          {activeCategory === "flexbox" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Flexbox elrendezés</h2>

              <DemoBox code="flex gap-4" fullWidth>
                <div className="flex gap-4">
                  <div className="flex-1 bg-blue-300 p-4 rounded text-center">Item 1</div>
                  <div className="flex-1 bg-blue-300 p-4 rounded text-center">Item 2</div>
                  <div className="flex-1 bg-blue-300 p-4 rounded text-center">Item 3</div>
                </div>
              </DemoBox>

              <DemoBox code="flex items-center justify-center" fullWidth>
                <div className="flex items-center justify-center h-48 bg-purple-200 rounded">
                  <span className="text-xl font-bold">Középre igazított elemek</span>
                </div>
              </DemoBox>

              <DemoBox code="flex flex-col gap-2 (oszlop elrendezés)" fullWidth>
                <div className="flex flex-col gap-2">
                  <div className="bg-green-300 p-3 rounded">Sor 1</div>
                  <div className="bg-green-300 p-3 rounded">Sor 2</div>
                  <div className="bg-green-300 p-3 rounded">Sor 3</div>
                </div>
              </DemoBox>

              <DemoBox code="flex flex-wrap gap-2" fullWidth>
                <div className="flex flex-wrap gap-2">
                  <div className="w-24 bg-orange-300 p-3 rounded text-center">1</div>
                  <div className="w-24 bg-orange-300 p-3 rounded text-center">2</div>
                  <div className="w-24 bg-orange-300 p-3 rounded text-center">3</div>
                  <div className="w-24 bg-orange-300 p-3 rounded text-center">4</div>
                  <div className="w-24 bg-orange-300 p-3 rounded text-center">5</div>
                </div>
              </DemoBox>
            </>
          )}

          {/* GRID */}
          {activeCategory === "grid" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Grid elrendezés</h2>

              <DemoBox code="grid grid-cols-3 gap-4" fullWidth>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-red-300 p-8 rounded text-center font-bold">1</div>
                  <div className="bg-red-300 p-8 rounded text-center font-bold">2</div>
                  <div className="bg-red-300 p-8 rounded text-center font-bold">3</div>
                  <div className="bg-red-300 p-8 rounded text-center font-bold">4</div>
                  <div className="bg-red-300 p-8 rounded text-center font-bold">5</div>
                  <div className="bg-red-300 p-8 rounded text-center font-bold">6</div>
                </div>
              </DemoBox>

              <DemoBox code="grid grid-cols-2 gap-4" fullWidth>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-300 p-8 rounded text-center font-bold">1</div>
                  <div className="bg-indigo-300 p-8 rounded text-center font-bold">2</div>
                  <div className="bg-indigo-300 p-8 rounded text-center font-bold">3</div>
                  <div className="bg-indigo-300 p-8 rounded text-center font-bold">4</div>
                </div>
              </DemoBox>

              <DemoBox code="grid grid-cols-4 md:grid-cols-2 gap-4 (reszponzív)" fullWidth>
                <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
                  <div className="bg-pink-300 p-6 rounded text-center font-bold">1</div>
                  <div className="bg-pink-300 p-6 rounded text-center font-bold">2</div>
                  <div className="bg-pink-300 p-6 rounded text-center font-bold">3</div>
                  <div className="bg-pink-300 p-6 rounded text-center font-bold">4</div>
                </div>
              </DemoBox>
            </>
          )}

          {/* BORDERS */}
          {activeCategory === "borders" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Szegélyek és sarkok</h2>

              <DemoBox code="rounded (border-radius: 0.25rem)" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="rounded border-2 border-gray-400 p-4">rounded</div>
                  <div className="rounded-md border-2 border-gray-400 p-4">rounded-md</div>
                  <div className="rounded-lg border-2 border-gray-400 p-4">rounded-lg</div>
                  <div className="rounded-2xl border-2 border-gray-400 p-4">rounded-2xl</div>
                  <div className="rounded-full border-2 border-gray-400 px-8 py-4">rounded-full</div>
                </div>
              </DemoBox>

              <DemoBox code="border-2 border-blue-500" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="border border-red-400 p-4 rounded">border (1px)</div>
                  <div className="border-2 border-blue-500 p-4 rounded">border-2 (2px)</div>
                  <div className="border-4 border-green-500 p-4 rounded">border-4 (4px)</div>
                </div>
              </DemoBox>

              <DemoBox code="border-t-2 border-l-2 (csak felső és bal szegély)" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="border-t-4 border-orange-500 p-4 rounded">border-t-4</div>
                  <div className="border-l-4 border-purple-500 p-4 rounded">border-l-4</div>
                  <div className="border-r-4 border-pink-500 p-4 rounded">border-r-4</div>
                  <div className="border-b-4 border-cyan-500 p-4 rounded">border-b-4</div>
                </div>
              </DemoBox>
            </>
          )}

          {/* SHADOWS */}
          {activeCategory === "shadows" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Árnyékok és effektek</h2>

              <DemoBox code="shadow (alapértelmezett árnyék)" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="shadow p-4 rounded bg-white">shadow</div>
                  <div className="shadow-md p-4 rounded bg-white">shadow-md</div>
                  <div className="shadow-lg p-4 rounded bg-white">shadow-lg</div>
                  <div className="shadow-xl p-4 rounded bg-white">shadow-xl</div>
                  <div className="shadow-2xl p-4 rounded bg-white">shadow-2xl</div>
                </div>
              </DemoBox>

              <DemoBox code="hover:shadow-lg (árnyék hover-re)" fullWidth>
                <div className="p-6 rounded bg-white shadow hover:shadow-lg transition cursor-pointer">
                  Vigyed fölé az egeret - az árnyék nő!
                </div>
              </DemoBox>

              <DemoBox code="shadow-none (nincs árnyék)" fullWidth>
                <div className="shadow-none border-2 border-gray-300 p-4 rounded">
                  Ez az elem nincs árnyéka
                </div>
              </DemoBox>
            </>
          )}

          {/* TRANSFORMS */}
          {activeCategory === "transforms" && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Transzformációk és animációk</h2>

              <DemoBox code="hover:scale-110 (nagyítás hover-re)" fullWidth>
                <div className="p-8 rounded bg-blue-300 hover:scale-110 transition cursor-pointer text-center font-bold">
                  Vigyed fölé az egeret!
                </div>
              </DemoBox>

              <DemoBox code="hover:bg-blue-600 (szín változás)" fullWidth>
                <div className="p-6 rounded bg-blue-400 hover:bg-blue-600 transition cursor-pointer text-white text-center font-bold">
                  A háttér szín változik szín hover-re
                </div>
              </DemoBox>

              <DemoBox code="rotate-45 (45 fokos forgatás)" fullWidth>
                <div className="flex justify-center items-center gap-8">
                  <div className="p-6 rounded bg-green-400 text-white font-bold">Eredeti</div>
                  <div className="p-6 rounded bg-green-400 text-white font-bold rotate-45">
                    Forgatva
                  </div>
                  <div className="p-6 rounded bg-green-400 text-white font-bold hover:rotate-180 transition">
                    Hover-ra fordul
                  </div>
                </div>
              </DemoBox>

              <DemoBox code="opacity-50 (50% átlátszóság)" fullWidth>
                <div className="flex gap-4 flex-wrap">
                  <div className="p-4 rounded bg-red-500 text-white opacity-20">opacity-20</div>
                  <div className="p-4 rounded bg-red-500 text-white opacity-50">opacity-50</div>
                  <div className="p-4 rounded bg-red-500 text-white opacity-75">opacity-75</div>
                  <div className="p-4 rounded bg-red-500 text-white opacity-100">opacity-100</div>
                </div>
              </DemoBox>

              <DemoBox code="transition (simított animáció)" fullWidth>
                <div className="p-6 rounded bg-purple-400 hover:bg-purple-700 hover:scale-105 transition cursor-pointer text-white text-center font-bold">
                  Simított átmenet hover-re
                </div>
              </DemoBox>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
