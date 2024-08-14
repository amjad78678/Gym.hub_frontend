import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GymCard from "./GymCard";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { duration, Slider } from "@mui/material";
import LocationInput from "./LocationInput";
import SearchBar from "./SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { Col, Container, Row } from "react-bootstrap";
import { tr } from "date-fns/locale";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <Container>
      <Row>
        <Col md={4} lg={3}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SearchBar searchHandler={searchHandler} />
            <div>
              <span className="text-xl">
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
          </motion.div>
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {allGyms?.map(
                  (gym) =>
                    !gym.isDeleted &&
                    !gym.isBlocked &&
                    gym.isVerified && (
                      <motion.div
                        key={gym._id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        layout
                      >
                        <GymCard gym={gym} />
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </motion.div>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
};

export default GymList;
