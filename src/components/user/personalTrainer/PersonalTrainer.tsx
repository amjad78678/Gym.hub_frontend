import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchBar from "../gymList/SearchBar";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Slider } from "@mui/material";
import TrainerCard from "./TrainerCard";
import InfiniteScroll from "react-infinite-scroll-component";

const PersonalTrainer = ({
  trainerData,
  handleBookNow,
  handleModal,
  modalOpen,
  bookingTrainer,
  setBookingTrainer,
  fetchMoreData,
  fullResult,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    console.log("iam trainer data", trainerData);
    
    if (trainerData && trainerData.length > 0) {
      setFilteredItems(trainerData);
      setMaxPrice(Math.max(...trainerData.map((trainer: any) => trainer.monthlyFee)));
    }
  
    console.log("iam filtered items", filteredItems);
  }, [trainerData]);

  const [sliderValue, setSliderValue] = useState(maxPrice);
  const searchHandler = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const filtered = trainerData.filter((trainer) => {
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
  if (maxPrice < 1) return;
  return  filteredItems && (
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
              <InfiniteScroll
                dataLength={filteredItems.length}
                next={fetchMoreData}
                hasMore={trainerData && trainerData.length < fullResult}
                loader={<h1>Loading...</h1>}
              >
                {filteredItems.map((trainer) => (
                  <>
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
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </>
    )
};

export default PersonalTrainer;
