import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../gymList/SearchBar";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutDetails } from "@/api/user";
import { Tooltip } from "@mui/material";
import Skeleton from "react-loading-skeleton";

const Workouts = ({ workoutList }) => {
  const searchHandler = () => {};
  const [part, setPart] = useState("back");
  const { isLoading, data: workoutDetails } = useQuery({
    queryKey: ["bodyPartWorkoutDetails", part],
    queryFn: getWorkoutDetails,
  });

  console.log("workoutDetails", workoutDetails);
  const [gifLoading, setGifLoading] = useState(true);

  return (
    <Container>
      <div className="grid sm:grid-cols-12">
        <div className="sm:col-span-3">
          <div className="mt-5">
            <span className=" text-xl">
              <span>Filters</span>{" "}
              <FilterListOutlinedIcon
                sx={{ color: "white", float: "right", fontSize: "27px" }}
              />
            </span>

            <div className="my-4">
              <div className=" rounded-lg border border-gray-200 w-full  text-sm font-medium">
                {workoutList.map((workout) => (
                  <p
                    onClick={() => setPart(workout)}
                    key={workout}
                    className="block px-4 py-2.5 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
                  >
                    {workout.toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {workoutDetails ? (
          <>
            <div className="sm:col-span-9 max-h-[500px] overflow-y-scroll no-scrollbar p-4">
              <h1 className="text-4xl font-bold text-center mb-10 font-serif underline">
                {part}
              </h1>

              <div className="grid sm:grid-cols-2 gap-4">
                {workoutDetails.data.details.map((detail, index) => (
                  <div
                    key={index}
                    className="sm:flex flex-col items-center cursor-pointer  border-b-2 border-b-slate-200"
                  >
                    <Tooltip title={detail.name}>
                      <h1 className="text-start text-xl font-bold mb-2 line-clamp-2 cursor-pointer">
                        {detail.name.length > 34
                          ? detail.name.substring(0, 35) + "..."
                          : detail.name}
                      </h1>
                    </Tooltip>

                    <div>
                      {gifLoading && <Skeleton width={300} height={300} />}
                      <img
                        src={detail.gifUrl}
                        alt="workout"
                        className="w-full h-auto"
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={() => setGifLoading(false)}
                      />
                    </div>
                    <div className="text-center mb-4">
                      <p className="my-2  font-semibold">
                        Equipment : {detail.equipment}
                      </p>
                      <p className="font-semibold">Target : {detail.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-3xl">Loading...</h1>
        )}
      </div>
    </Container>
  );
};

export default Workouts;
