import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GymCard from "./GymCard";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Slider } from "@mui/material";
import LocationInput from "./LocationInput";
import SearchBar from "./SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

const GymList = ({
  fetchMoreData,
  gyms,
  totalGyms,
  setLocation,
  isLoadingMore,
}) => {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (gyms) {
      setFilteredItems(gyms);
      setMaxPrice(Math.max(...gyms.map((gym) => gym.subscriptions.Daily)));
    }
  }, [gyms]);

  const [search, setSearch] = useState("");
  const searchHandler = (val: string) => {
    setSearch(val);
  };
  const [sliderValue, setSliderValue] = useState(maxPrice);
  const handleSliderChange = (event: Event, newValue: number) => {
    setSliderValue(newValue as number);
  };

  useEffect(() => {
    const filtered = gyms.filter((gym) => {
      const location = gym.address;
      const gymName = gym.gymName;

      const isSearchMatch =
        location.toLowerCase().includes(search.toLowerCase()) ||
        gymName.toLowerCase().includes(search.toLowerCase());

      const isPriceMatch = gym.subscriptions.Daily <= sliderValue;
      return isSearchMatch && isPriceMatch;
    });

    setFilteredItems(filtered);
  }, [search, sliderValue]);

  return (
    <div className="text-white min-h-screen">
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
                  <h1 className="text-lg mt-4 mb-2">Price</h1>

                  {maxPrice < 1 ? null : (
                    <Slider
                      sx={{ color: "white" }}
                      valueLabelDisplay="auto"
                      defaultValue={maxPrice}
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
            className=" rounded-lg overflow-y-scroll no-scrollbar max-h-screen"
          >
            <InfiniteScroll
              dataLength={filteredItems.length}
              next={fetchMoreData}
              hasMore={gyms && filteredItems?.length < totalGyms}
              loader={
                isLoadingMore ? (
                  <div className="text-center py-4">
                    <ClipLoader color="white" />
                  </div>
                ) : null
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {filteredItems?.map((gym) => {
                return !gym.isDeleted && <GymCard key={gym._id} gym={gym} />;
              })}
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GymList;
