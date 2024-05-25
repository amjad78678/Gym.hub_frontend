import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchBar from "../gymList/SearchBar";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Slider } from "@mui/material";
import TrainerCard from "./TrainerCard";

const PersonalTrainer = ({
  trainerData,
  handleBookNow,
  handleModal,
  modalOpen,
  bookingTrainer,
  setBookingTrainer,
}) => {
  const maxPrice = Math.max(
    ...trainerData.data.trainers.map((trainer: any) => trainer.monthlyFee)
  );
  const [sliderValue, setSliderValue] = useState(maxPrice);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(trainerData.data.trainers);
  const searchHandler = (value: string) => {
    setSearchValue(value);
  };

  console.log("i am largest price", maxPrice);
  console.log("iam filtered Items", filteredItems);

  useEffect(() => {
    const filtered = trainerData.data.trainers.filter((trainer) => {
      const trainerName = trainer.name;
      const isSearchMatch = trainerName
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const isPriceMatch = trainer.monthlyFee <= sliderValue;

      return isSearchMatch && isPriceMatch;
    });

    setFilteredItems(filtered);
  }, [sliderValue, searchValue]);

  const handleSliderChange = (event: Event, newValue: number) => {
    setSliderValue(newValue);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={4} lg={3}>
            <div>
              <SearchBar searchHandler={searchHandler} />
              <div>
                <span className="text-xl">
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
                    defaultValue={maxPrice}
                    max={maxPrice}
                    onChange={handleSliderChange}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col
            lg={9}
            md={8}
            className=" rounded-lg overflow-y-scroll no-scrollbar max-h-screen"
          >
            {filteredItems.map((trainer) => (
              <>
                {console.log("iam trainer each", trainer)}
                <TrainerCard
                  key={trainer._id}
                  {...{
                    trainer,
                    handleModal,
                    modalOpen,
                    handleBookNow,
                    bookingTrainer,
                    setBookingTrainer,
                  }}
                />
              </>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PersonalTrainer;
