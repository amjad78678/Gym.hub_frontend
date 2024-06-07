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
import { BeatLoader } from "react-spinners";

interface iAppState {
  app: {
    lat: number;
    long: number;
  };
}

const EditLocation = ({
  gym,
  setLatitude,
  setLongitude,
  latitude,
  longitude,
  isPending,
  handleSubmitEditDetails,
}) => {
  const mapRef = useRef();
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
            latitude={latitude}
            longitude={longitude}
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

      <div className="flex justify-center">
        <button
          onClick={handleSubmitEditDetails}
          disabled={isPending}
          type="submit"
          className="relative my-4 px-14 py-1 rounded-lg bg-white text-black hover:bg-slate-600"
        >
          <span>{isPending ? "Saving..." : "Save"}</span>
          {isPending && (
            <span className="absolute right-4">
              <BeatLoader color="black" size={7} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditLocation;
