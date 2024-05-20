import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../gymList/SearchBar";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Slider } from "@mui/material";
import TrainerCard from "./TrainerCard";

const PersonalTrainer = ({ trainerData,handleBookNow, handleModal, modalOpen, bookingTrainer,setBookingTrainer }) => {
  const searchHandler = () => {
    console.log("iam search handler");
  };
  const handleSliderChange = () => {
    console.log("jfjfhsjdh");
  };

  return  (
    <>
      <Container>
        <div className="grid sm:grid-cols-12 ">
          <div className="sm:col-span-3 mx-3">
            <div>
              <SearchBar searchHandler={searchHandler} />
              <div>
                <span className=" text-xl">
                  <span>Filters</span>{" "}
                  <FilterListOutlinedIcon
                    sx={{ color: "white", float: "right", fontSize: "27px" }}
                  />
                </span>

                <div className="">
                  <h1 className=" text-lg mt-4 mb-2">Price</h1>
                  <Slider
                    aria-label="Small steps"
                    sx={{ color: "white", ml: 0, mr: 6 }}
                    valueLabelDisplay="auto"
                    defaultValue={200}
                    max={100}
                    onChange={handleSliderChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-9">
            {trainerData.data.trainers.map((trainer) => (
               <>
               {console.log('iam trainer each',trainer)}
               <TrainerCard key={trainer._id} {...{ trainer, handleModal,modalOpen,handleBookNow,bookingTrainer,setBookingTrainer }} />
               </>
            ))}
          </div>

        </div>
      </Container>

    </>
  );
};

export default PersonalTrainer;
