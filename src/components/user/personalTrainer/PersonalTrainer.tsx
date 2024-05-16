import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../gymList/SearchBar";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Slider } from "@mui/material";
import TrainerCard from "./TrainerCard";
import Loader from "@/components/common/Loader";
// import TrainerCard from "./TrainerCard";

const PersonalTrainer = ({trainers}) => {
  const searchHandler = () => {
    console.log("iam search handler");
  };
  const handleSliderChange = () => {
    console.log("jfjfhsjdh");
  };

  console.log('inside personal trainer', trainers)

  return (

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


{ trainers?.map((trainer)=>(
<TrainerCard trainer={trainer} />
  
))}


      </div>

      </div>

      
    </Container>
  );
};

export default PersonalTrainer;
