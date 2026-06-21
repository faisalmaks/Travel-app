"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function HotelMap({
  hotel,
}) {
  if (
    !hotel?.location?.lat ||
    !hotel?.location?.lng
  ) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-400">
        Location not available
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800">

      <MapContainer
        center={[
          hotel.location.lat,
          hotel.location.lng,
        ]}
        zoom={14}
        scrollWheelZoom={true}
        style={{
          height: "400px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[
            hotel.location.lat,
            hotel.location.lng,
          ]}
        >
          <Popup>
            <div>

              <h3>
                {hotel.name}
              </h3>

              <p>
                {hotel.address}
              </p>

            </div>
          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
}