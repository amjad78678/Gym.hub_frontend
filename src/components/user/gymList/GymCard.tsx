// import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// const API_KEY = import.meta.env.GOOGLE_API_KEY

const GymCard = ({ gym }) => {
  // const [streetAddress, setStreetAddress] = useState("");

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${gym.location.coordinates[1]},${gym.location.coordinates[0]}&key=${API_KEY}`
  //     )
  //     .then((res) => {
  //       setStreetAddress(res.data.results[0].formatted_address);
  //     });
  // }, []);

  return (
    <div className="bg-black">
      <div className="flex flex-col my-4">
        <div className="relative bg-black flex flex-col md:flex-row md:space-x-5  md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white">
          <div className="w-full md:w-1/3 bg-black grid place-items-center">
            <img
              src={gym.images[0].imageUrl}
              alt="tailwind logo"
              className="rounded-xl"
            />
          </div>
          <div className="w-full md:w-2/3 bg-black text-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-medium hidden md:block">Gyms</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-gray-600 font-bold text-sm ml-1">
                  4.96
                  <span className="text-gray-500 font-normal">
                    (76 reviews)
                  </span>
                </p>
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
         
            </div>
            <h3 className="font-black text-white md:text-3xl text-xl">
              {gym.gymName}
            </h3>
            <p className="text-white text-sm">
              <LocationOnIcon />
              {gym?.address}
            </p>
            <p className="md:text-[0.7rem] text-white">
              {gym.description.length > 300
                ? gym.description.substring(0, 250) + "..."
                : gym.description}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-xl font-black text-white">
                ₹{gym.quarterlyFee}
                <span className="font-normal text-white text-base">
                  {gym.subscriptions.Daily}/Days
                </span>
              </p>

              <Link to={`/gym-details?id=${gym._id}`}>
                <Button
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Book now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymCard;
