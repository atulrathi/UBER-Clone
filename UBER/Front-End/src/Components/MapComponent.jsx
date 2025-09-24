import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const GeoMap = ({ pickup, destination }) => {
  return (
    <MapContainer
      center={[28.6139, 77.209]} // Default: Delhi
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=c43caf01b1bc4a379e04bc1b030683b2`}
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      {/* Example Pickup Marker */}
      {pickup && (
        <Marker position={[28.6139, 77.209]}>
          <Popup>Pickup: {pickup}</Popup>
        </Marker>
      )}

      {/* Example Destination Marker */}
      {destination && (
        <Marker position={[28.7041, 77.1025]}>
          <Popup>Destination: {destination}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default GeoMap;
