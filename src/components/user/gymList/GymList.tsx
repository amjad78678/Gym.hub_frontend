import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GymCard from "./GymCard";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useQuery } from "@tanstack/react-query";
import { fetchNearGymList } from "@/api/user";
import { Slider } from "@mui/material";
import LocationInput from "./LocationInput";
import SearchBar from "./SearchBar";

const GymList = () => {

  const [gymList, setGymList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const { isLoading, data: gymData, refetch } = useQuery({
    queryKey: ["gyms"],
    queryFn: async () => {
      if (location.latitude !== null && location.longitude !== null) {
        return await fetchNearGymList({ latitude: location.latitude, longitude: location.longitude });
      }
    },
    enabled : location.latitude !== null && location.longitude !== null
  });

  useEffect(() => {
    if (gymData) {
      setGymList(gymData?.data?.message);
      setFilteredItems(gymData?.data?.message);
    }
  
  }, [gymData]);

  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      refetch();
    }
  }, [location]);

  const maxPrice = Math.max(...gymList.map((gym) => gym.subscriptions.Daily));
  const [search, setSearch] = useState("");
  const searchHandler = (val: string) => {
    setSearch(val);
  };

  useEffect(() => {
    const filtered = gymList.filter((gym) => {
      const location = gym.address;
      const gymName = gym.gymName;

      return (
        location.toLowerCase().includes(search.toLowerCase()) ||
        gymName.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredItems(filtered);
  }, [search]);

  const [sliderValue, setSliderValue] = useState(maxPrice);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  useEffect(() => {
    const filtered = gymList.filter((gym) => {
      return gym.subscriptions.Daily <= sliderValue;
    });
    setFilteredItems(filtered);
  }, [sliderValue]);

  return  (
    <div className="text-white min-h-screen">
      <Container>
        <Row>
          <Col xs={3}>
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
                  <h1 className=" text-lg mt-4 mb-2">Price</h1>
                  <Slider
                    aria-label="Small steps"
                    sx={{ color: "white", ml: 0, mr: 6 }}
                    valueLabelDisplay="auto"
                    defaultValue={200}
                    max={maxPrice}
                    onChange={handleSliderChange}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={9}
            className=" rounded-lg overflow-y-scroll no-scrollbar max-h-screen"
          >
            {filteredItems?.map((gym) => {
                  return !gym.isDeleted && <GymCard key={gym._id} gym={gym} />;
                })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GymList;
