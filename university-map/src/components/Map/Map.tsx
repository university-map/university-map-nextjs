import React, { useCallback, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { useParams } from 'next/navigation';
import L from 'leaflet';
import DataLoader from '@/services/DataLoader';
import 'leaflet/dist/leaflet.css';


const blueIcon = new L.Icon({
  iconUrl: '/leaflet-color-markers/marker-icon-2x-blue.png',
  shadowUrl: '/leaflet-color-markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: '/leaflet-color-markers/marker-icon-2x-red.png',
  shadowUrl: '/leaflet-color-markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapMarker: React.FC<{
  country: string,
  universityName: string,
  coordinates: L.LatLngTuple,
  locationName: string,
  icon: L.Icon,
  onMarkerClick: (country: string, universityName: string) => void
}> = (props) => {
  return (
    <Marker
      position={props.coordinates}
      icon={props.icon}
      eventHandlers={{
        click: (e) => {
          props.onMarkerClick(props.country, props.universityName);
        },
      }}
    >
      <Popup>
        <div style={{ textAlign: 'center' }}>
          {props.universityName}
          <br />
          ({props.locationName})
        </div>
      </Popup>
    </Marker>
  );
};

const Map: React.FC<{
  onMarkerClick: (country: string, universityName: string) => void
}> = (props) => {
  const { locale, country, university } = useParams();
  const [markers, setMarkers] = useState([] as any[]);
  const dataLoader = DataLoader.getInstance();

  const handleMarkerClick = useCallback((country: string, universityName: string) => {
    props.onMarkerClick(country, universityName);
    setMarkers((prevMarkers) => {
      return prevMarkers.map((marker) => {
        return React.cloneElement(marker, {
          icon: marker.props.country === country && marker.props.universityName === universityName ? redIcon : blueIcon
        });
      });
    });
  }, [props]);

  useEffect(() => {
    const fetchData = async () => {
      if (markers?.length != 0) {
        // Already initialized
        return;
      }

      const univLocations = await dataLoader.getUnivLocations();
      let newMarkers = [];
      for (const univ of univLocations) {
        for (const location of univ.locations) {
          const isSelected = decodeURI(country as string) === univ.country && decodeURI(university as string) === univ.name;
          newMarkers.push(
            <MapMarker
              key={`${univ.country}@${univ.name}@${location.name}`}
              country={univ.country}
              universityName={univ.name}
              coordinates={location.coordinates}
              locationName={location.name}
              icon={isSelected ? redIcon : blueIcon}
              onMarkerClick={handleMarkerClick}
            />
          );
        }
      }
      setMarkers(newMarkers);
    };
    fetchData();
  }, [country, university, dataLoader, markers, handleMarkerClick]);

  return (
    <MapContainer
      center={[22.996900745680346, 120.21685639625197]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%' }}
      /* use bottomright zoom control instead */
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <ZoomControl position='bottomright' />
      {markers}
    </MapContainer>
  );
};

export default Map;