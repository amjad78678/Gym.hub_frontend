import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Audio } from "react-loader-spinner";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY


const LocationInput = ({setLocationData}) => {

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [streetAddress, setStreetAddress] = useState("");

  const fetchStreetAddress = async () => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${API_KEY}`
    );
    return response.data.results[0].formatted_address;
  };

  const { isLoading: isLocationLoading, data: streetAddressData } = useQuery({
    queryKey: ["locationData", location],
    queryFn: fetchStreetAddress,
  });

  useEffect(() => {
    if (streetAddressData) {
      setStreetAddress(streetAddressData);
    }
  }, [streetAddressData]);


  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLocationData({latitude, longitude})
        console.log('iam setting location', {latitude, longitude})
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Unable to get your current location");
      }
    );
  };

  return (
    <div className="my-3">
      <Button onClick={getCurrentLocation} sx={{ textTransform: "none" }}>
        <>
          <MyLocationOutlinedIcon fontSize="large" />
          <span className="mx-3 text-base">Use current location</span>
        </>
        {isLocationLoading && (
          <Audio height="30" width="30" color="green" ariaLabel="loading" />
        )}
      </Button>
      <p className="text-xs font-mono truncate text-blue-500 px-2">
        {streetAddress}
      </p>
    </div>
  );
};

export default LocationInput;
