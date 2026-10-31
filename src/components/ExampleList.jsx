import Playground from "./Playground";

/** Egy fül példáinak listája: példánként egy Playground kártya. */
export default function ExampleList({ examples }) {
  return (
    <div className="space-y-6">
      {examples.map((example) => (
        <Playground key={example.id} {...example} />
      ))}
    </div>
  );
}
