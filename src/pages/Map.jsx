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

  if (loading) return <p>Loading property...</p>;

  // Find property by id
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) return <p>Property not found!</p>;
  if (!property.locationmap) return <p>Property location not available!</p>;

  const { lat, lng } = property.locationmap; // ✅ use locationmap

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {property.title} <br /> {property.location}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}