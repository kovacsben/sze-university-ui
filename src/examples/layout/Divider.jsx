import { Divider } from "sze-ui";

export default function Pelda() {
  return (
    <div className="space-y-6">
      {/* Horizontal Divider */}
      <div>
        <h4 className="font-semibold text-sze-primary mb-3">Horizontal Divider</h4>
        <div>
          <p className="text-gray-700 mb-2">Tartalom fölött</p>
          <Divider />
          <p className="text-gray-700 mb-2">Tartalom között</p>
          <Divider type="dashed" />
          <p className="text-gray-700">Tartalom alatt</p>
        </div>
      </div>

      {/* Horizontal Divider with Text */}
      <div>
        <h4 className="font-semibold text-sze-primary mb-3">Divider szöveggel</h4>
        <div className="space-y-3">
          <div>
            <p className="text-gray-700 mb-2">Széchenyi István Egyetem</p>
            <Divider align="center">VAGY</Divider>
            <p className="text-gray-700 mt-2">Más intézmény</p>
          </div>
        </div>
      </div>

      {/* Types */}
      <div>
        <h4 className="font-semibold text-sze-primary mb-3">Divider típusok</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm mb-1 text-gray-600">Solid</p>
            <Divider type="solid" />
          </div>
          <div>
            <p className="text-sm mb-1 text-gray-600">Dashed</p>
            <Divider type="dashed" />
          </div>
        </div>
      </div>
    </div>
  );
}
