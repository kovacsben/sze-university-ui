import { Gallery } from "sze-ui";

// Képek a Széchenyi István Egyetem honlapjáról (uni.sze.hu). A honlap a Wix
// képszerverét használja, ami az URL-ben kapott méretre vágja a képet:
// a rácsba kis bélyegkép, a nagyítóba nagyobb változat töltődik.
const kep = (id, w, h) => `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_85/${id}`;

const kepek = [
  { id: "715908_7ce3d8ecffba42519134172362b3b29d~mv2.jpg", title: "A kampusz madártávlatból" },
  { id: "a64cda_0f0330e1ebec40808b94196a5f560764~mv2.jpg", title: "Egyetemi épületek" },
  { id: "a64cda_39648a49575f4c049224989185b5bf33~mv2.jpg", title: "Széchenyi-szobor a kampuszon" },
  { id: "a64cda_6e74d3d3d89948c7a90b6c77a8f3ebda~mv2.jpg", title: "Modern oktatási épület" },
  { id: "a64cda_a0863b1b9ab44c5295f59b83d102774e~mv2.jpg", title: "Zöld kampusz" },
  { id: "a64cda_f0f6b5f1acaa4a67bb7ce504680a8f02~mv2.jpg", title: "Történelmi épület" },
].map((k) => ({ title: k.title, thumb: kep(k.id, 480, 480), src: kep(k.id, 1200, 800) }));

export default function Pelda() {
  return <Gallery items={kepek} columns={3} gap={4} rounded="rounded-xl" />;
}
