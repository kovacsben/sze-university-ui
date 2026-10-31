import { useState } from "react";
import { Rating } from "sze-ui";

export default function Pelda() {
  const [rating, setRating] = useState(3);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Rating value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
        <span className="text-sm text-gray-600">({rating} csillag)</span>
      </div>
    </div>
  );
}
