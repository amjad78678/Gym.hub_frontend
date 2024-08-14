import React, { useState } from "react";
import { Container } from "react-bootstrap";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutDetails } from "@/api/user";
import { Tooltip } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { motion, AnimatePresence } from "framer-motion";

const Workouts = ({ workoutList }) => {
  const [part, setPart] = useState("back");
  const { isLoading, data: workoutDetails } = useQuery({
    queryKey: ["bodyPartWorkoutDetails", part],
    queryFn: getWorkoutDetails,
  });

  const [gifLoading, setGifLoading] = useState(true);
  const handleChange = (event: SelectChangeEvent<typeof part>) => {
    const {
      target: { value },
    } = event;
    setPart(value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <Container>
      <div className="grid sm:grid-cols-12">
        <motion.div
          className="sm:col-span-3"
          variants={filterVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mt-5">
            <span className="text-xl text-white">
              <span>Filters</span>{" "}
              <FilterListOutlinedIcon
                sx={{ color: "white", float: "right", fontSize: "27px" }}
              />
            </span>

            <div className="my-4">
              <div className="rounded-lg border border-gray-700 w-full text-sm font-medium">
                {workoutList.map((workout) => (
                  <motion.p
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#3b82f6", // blue-500
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPart(workout)}
                    key={workout}
                    className="hidden lg:block px-4 py-2.5 border-b border-gray-700 w-full text-white hover:bg-gray-800 lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-blue-500 cursor-pointer transition-colors duration-200"
                  >
                    {workout.toUpperCase()}
                  </motion.p>
                ))}
                <div className="block lg:hidden">
                  <FormControl
                    sx={{
                      lg: { width: 300 },
                      width: "100%",
                      backgroundColor: "#1f2937", // gray-800
                      color: "white",
                    }}
                  >
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={part}
                      onChange={handleChange}
                      sx={{
                        color: "white",
                        "& .MuiSelect-icon": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #4b5563", // gray-600
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #6b7280", // gray-500
                        },
                        fontSize: "20px",
                      }}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                            backgroundColor: "#1f2937", // gray-800
                            color: "white",
                          },
                        },
                      }}
                    >
                      {workoutList.map((workout) => (
                        <MenuItem
                          key={workout}
                          value={workout}
                          style={{ color: "white" }}
                        >
                          {workout}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={part}
            className="sm:col-span-9 max-h-[500px] overflow-y-scroll no-scrollbar p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {workoutDetails ? (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-bold text-center mb-10 font-serif underline text-white"
                >
                  {part}
                </motion.h1>

                <div className="grid sm:grid-cols-2 gap-4">
                  {workoutDetails.data.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="sm:flex flex-col items-center cursor-pointer border-b-2 border-gray-700 bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-200"
                    >
                      <Tooltip title={detail.name}>
                        <h1 className="text-start text-xl font-bold mb-2 line-clamp-2 cursor-pointer text-white">
                          {detail.name.length > 34
                            ? detail.name.substring(0, 35) + "..."
                            : detail.name}
                        </h1>
                      </Tooltip>

                      <div>
                        {gifLoading && (
                          <Skeleton
                            width={300}
                            height={300}
                            baseColor="#2d3748"
                            highlightColor="#4a5568"
                          />
                        )}
                        <motion.img
                          src={detail.gifUrl}
                          alt="workout"
                          className="w-full h-auto rounded-md"
                          style={{ display: gifLoading ? "none" : "block" }}
                          onLoad={() => setGifLoading(false)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <motion.div
                        className="text-center mb-4 text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="my-2 font-semibold">
                          Equipment : {detail.equipment}
                        </p>
                        <p className="font-semibold">
                          Target : {detail.target}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="sm:col-span-9 ">
                <div className="grid sm:grid-cols-2 sm:gap-2">
                  <Skeleton
                    width={300}
                    height={300}
                    baseColor="#2d3748"
                    highlightColor="#4a5568"
                  />
                  <Skeleton
                    width={300}
                    height={300}
                    baseColor="#2d3748"
                    highlightColor="#4a5568"
                  />
                  <Skeleton
                    width={300}
                    height={300}
                    baseColor="#2d3748"
                    highlightColor="#4a5568"
                  />
                  <Skeleton
                    width={300}
                    height={300}
                    baseColor="#2d3748"
                    highlightColor="#4a5568"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default Workouts;
