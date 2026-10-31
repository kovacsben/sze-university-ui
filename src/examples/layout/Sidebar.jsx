import { useState } from "react";
import { Button, Sidebar } from "sze-ui";

export default function Pelda() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <div className="flex gap-3">
        <Button label="Nyitás" onClick={() => setSidebarVisible(true)} />
      </div>
      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
        <div className="space-y-3">
          <h3 className="font-semibold text-sze-primary">Menü</h3>
          <div className="space-y-2">
            <div className="px-3 py-2 hover:bg-white rounded cursor-pointer">Elem 1</div>
            <div className="px-3 py-2 hover:bg-white rounded cursor-pointer">Elem 2</div>
            <div className="px-3 py-2 hover:bg-white rounded cursor-pointer">Elem 3</div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
