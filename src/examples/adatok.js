/**
 * A bemutató példák közös adatai. Csak az a példa importálja, amelyiknek
 * tényleg nagyobb adathalmaz kell (a Fa komponens); a többi példa a saját
 * kódjában tartja a mintaadatait, hogy önmagában olvasható és másolható legyen.
 *
 * Az élő szerkesztőben `import { SZE_FA } from "../adatok";` formában érhető el
 * (lásd src/components/live/compile.js modul-shim).
 */

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
export const SZE_KAROK = [
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
export const SZE_FA = [
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
export function expandableKeys(nodes, acc = {}) {
  for (const node of nodes) {
    if (node.children?.length) {
      acc[node.key] = true;
      expandableKeys(node.children, acc);
    }
  }
  return acc;
}
