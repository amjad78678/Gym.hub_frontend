import axios from "axios";
import errorHandle from "./error";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getWorkoutsBodyList = async () => {
  try {
    const response = await axios.get(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      {
        headers: {
          "x-rapidapi-key":
            "372263670cmshe0168a51da51174p1033edjsnb3e7333db364",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      }
    );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getWorkoutDetails = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, bodyPart] = queryKey;
  try {
    const response = await axios.get(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      {
        headers: {
          "x-rapidapi-key":
            "372263670cmshe0168a51da51174p1033edjsnb3e7333db364",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      }
    );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
