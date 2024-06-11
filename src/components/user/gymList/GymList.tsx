import React from "react";
import GymCard from "./GymCard";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Slider } from "@mui/material";
import LocationInput from "./LocationInput";
import SearchBar from "./SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { Col, Container, Row } from "react-bootstrap";

const GymList = ({
  fetchMoreData,
  gyms,
  setLocation,
  isLoadingMore,
  setSearch,
  allGyms,
  setSliderValue,
  sliderValue,
  maxPrice,
}) => {
  const searchHandler = (val: string) => {
    setSearch(val);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={4} lg={3}>
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
                  <LocationInput setLocationData={setLocation} />
                  <h1 className="text-lg text-white mt-4 mb-2">Price</h1>
                  {maxPrice > 0 && (
                    <Slider
                      sx={{ color: "white" }}
                      valueLabelDisplay="auto"
                      value={sliderValue}
                      max={maxPrice}
                      onChange={handleSliderChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col
            lg={9}
            md={8}
            id="scrollableDiv"
            className="rounded-lg overflow-y-scroll no-scrollbar max-h-screen"
          >
            <InfiniteScroll
              dataLength={allGyms.length}
              next={fetchMoreData}
              hasMore={gyms && gyms?.length > 0}
              scrollableTarget="scrollableDiv"
              loader={
                isLoadingMore ? (
                  <div className="text-center py-4">
                    <ClipLoader color="white" />
                  </div>
                ) : null
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b className="text-white">Yay! You have seen it all</b>
                </p>
              }
            >
              {allGyms?.map(
                (gym) =>
                  !gym.isDeleted &&
                  !gym.isBlocked && (
                    <>
                      <GymCard key={gym._id} gym={gym} />
                    </>
                  )
              )}
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GymList;
