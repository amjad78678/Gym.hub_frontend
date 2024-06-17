import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useControl } from "react-map-gl";
import { useDispatch } from "react-redux";
import { setLatitude, setLongitude } from "@/redux/slices/appSlice";

const MAPBOX_API = import.meta.env.VITE_MAPBOX_TOKEN;

const GeoCoder = () => {
  const dispatch = useDispatch();

  const geocoder = new MapboxGeocoder({
    accessToken: MAPBOX_API,
    marker: false,
    collapsed: true,
  });

  useControl(() => geocoder);

  geocoder.on("result", (e) => {

    
    const coords = e.result.geometry.coordinates;
    dispatch(setLongitude(coords[0]));
    dispatch(setLatitude(coords[1]));
  });

  return null;
};

export default GeoCoder;
