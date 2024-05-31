import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GymCard from "./GymCard";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useQuery } from "@tanstack/react-query";
import { fetchNearGymList } from "@/api/user";
import { Slider } from "@mui/material";
import LocationInput from "./LocationInput";
import SearchBar from "./SearchBar";
import GymListSkeleton from "../skeletons/GymListSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const GymList = () => {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [page, setPage] = useState(1);

  const {
    isLoading,
    data: gymData,
    refetch,
  } = useQuery({
    queryKey: ["gymsListUserSide"],
    queryFn: async () => {
      return await fetchNearGymList({
        latitude: location.latitude,
        longitude: location.longitude,
        page: page,
      });
    },
    enabled: location.latitude !== null && location.longitude !== null,
  });

  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    if (gymData && gymData.data && gymData.data.message) {
      setFilteredItems((prev) => {
        // Ensure prev is an array before spreading its contents
        const prevArray = Array.isArray(prev) ? prev : [];
        return [...prevArray, ...gymData.data.message];
      });

      setMaxPrice(
        Math.max(...gymData.data.message.map((gym) => gym.subscriptions.Daily))
      );
    }
  }, [gymData]);

  // useEffect(() => {
  //   if (location.latitude !== null && location.longitude !== null) {
  //       refetch();
  //   }
  // }, [location]);

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

  console.log("iam filtered", filteredItems);
  console.log("fetch gym data", gymData);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    refetch();
  };

  if (!filteredItems) return;
  if (isLoading) return <GymListSkeleton />;

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
                    {maxPrice > 0 && (
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
                hasMore={true}
                loader={
                  <h1 className="text-white text-xl">Loading..........</h1>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {filteredItems.map((gym) => {
                  return !gym.isDeleted && <GymCard key={gym._id} gym={gym} />;
                })}
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </div>
    )
};

export default GymList;
