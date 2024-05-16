import { Button, Link } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const TrainerCard = ({ trainer }) => {
  const dummyImageUrl = "https://via.placeholder.com/150"; // Dummy image URL
  const dummyGymName = "Gym Name";
  const dummyDescription = "A great place to workout!";
  const dummyQuarterlyFee = "$50";
  const dummyDailySubscription = "Daily";

  console.log("inside trainer card", trainer);

  return (
    <div className="bg-black">
      <div className="flex flex-col my-4">
        <div className="relative bg-black flex flex-col md:flex-row md:space-x-5 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white">
          <div className="w-full md:w-1/3 bg-black grid place-items-center">
            <img
              src={trainer.image.imageUrl}
              alt="Gym Image"
              className="rounded-xl"
            />
          </div>
          <div className="w-full md:w-2/3 bg-black text-white flex flex-col space-y-2 p-2">
            <div className="flex justify-between">
              <h3 className="font-black text-white md:text-3xl text-xl">
                Tr.{trainer.name}
              </h3>

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
            </div>

            <div className="flex flex-col mt-3">
              <div className="flex flex-col space-y-2">
                <h2>Gym Trainer : {trainer.gymId.gymName}</h2>
                <h2>Gender : {trainer.gender}</h2>
                <h2>Age : {trainer.age}</h2>
                <h2>Experiance : {trainer.experience}</h2>
                <span>
                  <span>Achievements : {trainer.achievements}</span>{" "}
                  <Link href={`/gym-details?id=123`}>
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
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
