import { Avatar } from "sze-ui";

export default function Pelda() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="normal" shape="circle" label="JD" />
        <span className="text-xs text-gray-600">Betűjel</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="normal" shape="circle" icon="pi pi-user" />
        <span className="text-xs text-gray-600">Ikon</span>
      </div>
    </div>
  );
}
