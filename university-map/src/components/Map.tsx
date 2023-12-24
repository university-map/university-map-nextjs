import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet' 

import 'leaflet/dist/leaflet.css'

const greenIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Map() {
  return (
    <MapContainer
      center={[22.996900745680346, 120.21685639625197]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[22.996900745680346, 120.21685639625197]} icon={greenIcon} >
        <Popup>
          National Cheng Kung University
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;