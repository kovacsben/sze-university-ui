import { ScrollPanel } from "sze-ui";

export default function Pelda() {
  return (
    <ScrollPanel height="300px">
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="p-3 bg-sze-primary-50 rounded border border-sze-primary-200">
            <h4 className="font-semibold text-sze-primary">Elem {i + 1}</h4>
            <p className="text-sm text-gray-600">Ez egy görgethető panel tartalma.</p>
          </div>
        ))}
      </div>
    </ScrollPanel>
  );
}
