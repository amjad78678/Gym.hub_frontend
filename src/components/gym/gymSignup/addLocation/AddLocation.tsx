import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import ReactMapGl, {
  GeolocateControl,
  GeolocateResultEvent,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { setLatitude, setLongitude } from "@/redux/slices/appSlice";
const MAPBOX_API = import.meta.env.VITE_MAPBOX_TOKEN;
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import GeoCoder from "./GeoCoder";

interface iAppState {
  app: {
    lat: number;
    long: number;
  };
}

const AddLocation = () => {
  const mapRef = useRef();

  useEffect(() => {
    if (!lat && !long) {
      axios.get("https://ipapi.co/json").then((res) => {
        console.log(res.data);

        mapRef.current.flyTo({
          center: [res.data.longitude, res.data.latitude],
        });

        dispatch(setLatitude(res.data.latitude));
        dispatch(setLongitude(res.data.longitude));
      });
    }
  });
  const dispatch = useDispatch();
  const { lat, long } = useSelector((state: iAppState) => state.app);

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
            latitude: lat,
            longitude: long,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            latitude={lat}
            longitude={long}
            draggable
            onDragEnd={(e) => {
              dispatch(setLatitude(e.lngLat.lat));
              dispatch(setLongitude(e.lngLat.lng));
            }}
          />

          <NavigationControl position="bottom-right" />

          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e: GeolocateResultEvent) => {
              dispatch(setLatitude(e.coords.latitude));
              dispatch(setLongitude(e.coords.longitude));
            }}
          />
          <GeoCoder/>
        </ReactMapGl>
      </Box>
    </div>
  );
};

export default AddLocation;
