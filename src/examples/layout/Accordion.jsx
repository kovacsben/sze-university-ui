import { Accordian } from "sze-ui";

const items = [
  {
    header: "A Széchenyi István Egyetemről",
    content:
      "A Széchenyi István Egyetem (SZE) Győrben működő, sokkarú felsőoktatási intézmény. Mérnöki, gazdasági, jogi, egészségügyi, pedagógiai és művészeti képzéseket kínál, szoros ipari kapcsolatokkal.",
  },
  {
    header: "Mérnöki képzések",
    content:
      "Járműmérnöki, gépészmérnöki, mérnökinformatikus, villamosmérnöki, építőmérnöki és közlekedésmérnöki alapképzések - laborokkal és gyakorlati projektekkel.",
  },
  {
    header: "Kutatási lehetőségek",
    content:
      "Az egyetem kutatócsoportjaiban és laboratóriumaiban a hallgatók már az alapképzés alatt bekapcsolódhatnak ipari és tudományos projektekbe.",
  },
  {
    header: "Nemzetközi kapcsolatok",
    content:
      "Erasmus+ és más csereprogramok révén a hallgatók félévet tölthetnek külföldi partneregyetemeken, az egyetem pedig nemzetközi hallgatókat is fogad.",
  },
];

export default function Pelda() {
  // Az első fül nyitva indul, hogy látszódjon a nyitott és a zárt fülek különbsége.
  return <Accordian items={items} activeIndex={0} />;
}
