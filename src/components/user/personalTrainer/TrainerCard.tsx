import { Button } from "@mui/material";
import React, { useState } from "react";
import SubscriptionModal from "./SubscriptionModal";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const TrainerCard = ({
  trainer,
  handleModal,
  modalOpen,
  handleBookNow,
  bookingTrainer,
  setBookingTrainer,
}) => {
  return (
    <>
      <div className="bg-black">
        <div className="flex flex-col my-4">
          <div className="relative bg-black flex flex-col md:flex-row md:space-x-5 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white">
            <div className="w-full md:w-1/3 bg-black grid place-items-center">
              <img
                src={trainer?.image?.imageUrl}
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
                  <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                    Trainer
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <div className="flex flex-col space-y-2">
                  <h2>Gym Trainer : {trainer.gymId.gymName}</h2>
                  <h2>Gender : {trainer.gender}</h2>
                  <h2>Age : {trainer.age}</h2>
                  <h2>Experiance : {trainer.experience} years</h2>
                  <span>
                    <span>Achievements : {trainer.achievements}</span>{" "}
                    <Button
                      onClick={() => handleBookNow(trainer)}
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
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <SubscriptionModal
          handleModal={handleModal}
          modalOpen={modalOpen}
          trainer={bookingTrainer}
          setBookingTrainer={setBookingTrainer}
        />
      )}
    </>
  );
};

export default TrainerCard;
