import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import DataLoader from '@/services/DataLoader';
import { UniversityLocation } from '@/services/models';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: "/leaflet-color-markers/marker-icon-2x-blue.png",
  shadowUrl: "/leaflet-color-markers/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map: React.FC = () => {
  const [markers, setMarkers] = useState([] as any[]);
  const dataLoader = DataLoader.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      const univLocations = await dataLoader.getUnivLocations();
      let newMarkers = [];
      for (const univ of univLocations) {
        for (const location of univ.locations) {
          newMarkers.push(
            <Marker
              position={location.coordinates}
              icon={markerIcon}
            >
              <Popup>
                < div style={{ textAlign: 'center' }}>
                  {univ.name}
                  <br />
                  ({location.name})
                </div>
              </Popup>
            </Marker>
          );
        }
      }
      setMarkers(newMarkers);
    };
    fetchData();
  }, []);

  return (
    <MapContainer
      center={[22.996900745680346, 120.21685639625197]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
      /* use bottomright zoom control instead */
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {markers}
    </MapContainer>
  );
}

export default Map;