import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useControl } from "react-map-gl";


const MAPBOX_API = import.meta.env.VITE_MAPBOX_TOKEN;

const EditLocationGeoCoder = ({ setLatitude, setLongitude }) => {
  const geocoder = new MapboxGeocoder({
    accessToken: MAPBOX_API,
    marker: false,
    collapsed: true,
  });

  useControl(() => geocoder);

  geocoder.on("result", (e) => {
    
    const coords = e.result.geometry.coordinates;
    setLongitude(coords[0]);
    setLatitude(coords[1]);
  });

  return null;
};

export default EditLocationGeoCoder;
