import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Fix default marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationSection = () => {
  const position = [23.791599, 90.404046]; // Banani, Dhaka coordinates

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Our Location</h2>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Address Info */}
          <div className="card bg-base-200 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 text-[#76b38f]">Visit Us</h3>
            <p className="text-lg leading-relaxed">
              📍 <strong>Sports Club Arena</strong><br />
              House 12, Road 23, Block B,<br />
              Banani, Dhaka 1213, Bangladesh<br />
              Phone: +880 1234-111111<br />
              Email: info@sportsclub.com
            </p>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-[#76b38f]">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  Sports Club Arena<br />Banani, Dhaka.
                </Popup>
              </Marker>
            </MapContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
