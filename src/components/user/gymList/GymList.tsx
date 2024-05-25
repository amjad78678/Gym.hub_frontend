import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GymCard from "./GymCard";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useQuery } from "@tanstack/react-query";
import { fetchNearGymList } from "@/api/user";
import { Slider, useMediaQuery } from "@mui/material";
import LocationInput from "./LocationInput";
import SearchBar from "./SearchBar";

const GymList = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const {
    isLoading,
    data: gymData,
    refetch,
  } = useQuery({
    queryKey: ["gymsListUserSide"],
    queryFn: async () => {
      if (location.latitude !== null && location.longitude !== null) {
        return await fetchNearGymList({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    },
    enabled: location.latitude !== null && location.longitude !== null,
  });

  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    if (gymData) {
      setFilteredItems(gymData?.data?.message);
      setMaxPrice(
        Math.max(...gymData.data.message.map((gym) => gym.subscriptions.Daily))
      );
    }
  }, [gymData]);

  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      refetch();
    }
  }, [location]);

  const [search, setSearch] = useState("");
  const searchHandler = (val: string) => {
    setSearch(val);
  };
  const [sliderValue, setSliderValue] = useState(maxPrice);
  const handleSliderChange = (event: Event, newValue: number) => {
    setSliderValue(newValue as number);
  };

  useEffect(() => {
    const filtered = gymData?.data?.message.filter((gym) => {
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
    !isLoading && (
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
                    {maxPrice > 0 && (
                      <Slider
                        sx={{ color: "white"}}
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
              {filteredItems?.map((gym) => {
                return !gym.isDeleted && <GymCard key={gym._id} gym={gym} />;
              })}
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};

export default GymList;
