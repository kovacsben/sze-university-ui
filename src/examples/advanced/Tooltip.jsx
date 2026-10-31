import { Tooltip } from "sze-ui";

export default function Pelda() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Ez egy tooltip">
        <span className="text-sze-primary cursor-help">Mutass rá</span>
      </Tooltip>
      <Tooltip content="Másik tooltip" position="bottom">
        <span className="text-sze-secondary cursor-help">Lent</span>
      </Tooltip>
    </div>
  );
}
