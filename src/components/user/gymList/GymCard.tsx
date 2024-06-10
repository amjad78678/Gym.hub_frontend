import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const GymCard = ({ gym }) => {
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
                  {gym?.averageRating}
                  <span className="text-gray-500 font-normal">
                    ({gym?.totalReviews} reviews)
                  </span>
                </p>
              </div>
            </div>
            <h3 className="font-black text-white text-lg lg:text-3xl">
              {gym.gymName}
            </h3>
            <p className="text-white text-xs lg:sm">
              <LocationOnIcon />
              {gym?.address}
            </p>
            <p className="block lg:hidden sm:text-[0.7rem] text-white">
              {gym.description.length > 70
                ? gym.description.substring(0, 70) + "..."
                : gym.description}
            </p>
            <p className="hidden lg:block sm:text-[0.7rem] text-white">
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
                    float: "right",
                    fontWeight: "bold",
                    color: "green",
                    ":hover": {
                      color: "yellowgreen",
                      transition: "all 0.3s ease",
                      transform: "scale(1.05)",
                      cursor: "pointer",
                    },
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
