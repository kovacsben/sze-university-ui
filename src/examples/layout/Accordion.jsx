import { Accordian } from "sze-ui";

const items = [
  {
    header: "🎓 Széchenyi István Egyetem Bemutatása",
    content:
      "A Széchenyi István Egyetem (SZE) Magyarország egyik vezető felsőoktatási intézménye. Az egyetem modern képzéseket és kutatási lehetőségeket kínál a hallgatók számára.",
  },
  {
    header: "💼 Mérnöki Programok",
    content:
      "Széleskörű mérnöki szakok közül választhat: Gépészmérnöki, Elektromérnöki, Informatikai, Építőmérnöki, és még sok más program áll rendelkezésre.",
  },
  {
    header: "🔬 Kutatási Lehetőségek",
    content:
      "Az egyetem aktívan támogatja a tudományos kutatást. Számos kutatási projekt és laboratorium áll az oktatók és hallgatók rendelkezésére módszerek és technológiák fejlesztésére.",
  },
  {
    header: "🌍 Nemzetközi Kapcsolatok",
    content:
      "Az SZE nemzetközi partnervárostok széles hálózatával működik együtt, és csereprogramokat kínál a hallgatók számára szerte a világon.",
  },
];

export default function Pelda() {
  return <Accordian items={items} />;
}
