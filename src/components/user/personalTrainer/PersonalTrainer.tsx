import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap";
import SearchBar from "../gymList/SearchBar";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Slider } from "@mui/material";
import TrainerCard from "./TrainerCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const PersonalTrainer = ({
  allTrainers,
  trainerData,
  handleBookNow,
  handleModal,
  modalOpen,
  bookingTrainer,
  setBookingTrainer,
  fetchMoreData,
  isLoadingMore,
  setSearch,
  setSliderValue,
  sliderValue,
  maxPrice,
  setExperience,
  experience
}) => {

  const searchHandler = (value: string) => {
    setSearch(value);
  };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue);
  };

  const [dropDown, setDropDown] = useState(false);
  const handleChange = (event) => {
    setExperience(event.target.name);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4} lg={3}>
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
          >
            <SearchBar searchHandler={searchHandler} />
            <div>
              <span className="text-xl">
                <span>Filters</span>{" "}
                <FilterListOutlinedIcon
                  sx={{ color: "white", float: "right", fontSize: "27px" }}
                />
              </span>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center py-2 mt-4">
                  <h1 className=" text-lg  mb-2">Experience</h1>
                  <motion.span
                    className="cursor-pointer"
                    onClick={() => setDropDown(!dropDown)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <KeyboardArrowDownOutlined />
                  </motion.span>
                </div>
                <AnimatePresence>
                  {dropDown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                    <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="All"
                              checked={experience === "All"}
                              onChange={handleChange}
                              sx={{ color: "white" }}
                            />
                          }
                          label="All"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="1-3 years"
                              checked={experience === "1-3 years"}
                              onChange={handleChange}
                              sx={{ color: "white" }}
                            />
                          }
                          label="1-3 years"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="3-5 years"
                              checked={experience === "3-5 years"}
                              onChange={handleChange}
                              sx={{ color: "white" }}
                            />
                          }
                          label="3-5 years"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="5plus years"
                              checked={experience === "5plus years"}
                              onChange={handleChange}
                              sx={{ color: "white" }}
                            />
                          }
                          label="5+ years"
                        />
                      </FormGroup>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="">
                <h1 className=" text-lg mt-4 mb-2">Price</h1>
                {maxPrice > 0 && (
                  <Slider
                    aria-label="Small steps"
                    sx={{ color: "white", ml: 0, mr: 6 }}
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
            dataLength={allTrainers.length}
            next={fetchMoreData}
            hasMore={trainerData && trainerData.length > 0}
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
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {allTrainers.map((trainer) => (
                <motion.div key={trainer._id} variants={itemVariants}>
                  <TrainerCard
                    {...{
                      trainer,
                      handleModal,
                      modalOpen,
                      handleBookNow,
                      bookingTrainer,
                      setBookingTrainer,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalTrainer;