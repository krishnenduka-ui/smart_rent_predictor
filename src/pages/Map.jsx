import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map() {
  const { id } = useParams();
  const { properties, loading } = useSelector(state => state.properties);

  if (loading) return <p className="text-center mt-4">Loading property...</p>;

  // Find property by id
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) return <p className="text-center mt-4">Property not found!</p>;
  if (!property.locationmap) return <p className="text-center mt-4">Property location not available!</p>;

  const { lat, lng } = property.locationmap;

  return (
    <div className="w-full h-screen"> {/* Full width & height of viewport */}
      <MapContainer 
        center={[lat, lng]} 
        zoom={13} 
        className="w-full h-full" // Tailwind handles full width & height
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <span className="font-semibold">{property.title}</span><br />
            <span>{property.location}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
