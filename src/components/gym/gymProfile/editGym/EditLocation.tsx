import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactMapGl, {
  GeolocateControl,
  GeolocateResultEvent,
  Marker,
  NavigationControl,
} from "react-map-gl";
const MAPBOX_API = import.meta.env.VITE_MAPBOX_TOKEN;
import "mapbox-gl/dist/mapbox-gl.css";
import EditLocationGeoCoder from "./EditLocationGeoCoder";

interface iAppState {
  app: {
    lat: number;
    long: number;
  };
}

const EditLocation = ({ gym }) => {
  const mapRef = useRef();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  return (
    <div>
      <Box
        sx={{
          height: 400,
          position: "relative",
        }}
      >
        <ReactMapGl
          ref={mapRef}
          mapboxAccessToken={MAPBOX_API}
          initialViewState={{
            latitude: gym[0].location.coordinates[1],
            longitude: gym[0].location.coordinates[0],
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            latitude={gym[0].location.coordinates[1]}
            longitude={gym[0].location.coordinates[0]}
            draggable
            onDragEnd={(e) => {
              setLatitude(e.lngLat.lat);
              setLongitude(e.lngLat.lng);
            }}
          />

          <NavigationControl position="bottom-right" />

          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e: GeolocateResultEvent) => {
              setLatitude(e.coords.latitude);
              setLongitude(e.coords.longitude);
            }}
          />
          <EditLocationGeoCoder {...{ setLatitude, setLongitude }} />
        </ReactMapGl>
      </Box>
    </div>
  );
};

export default EditLocation;
