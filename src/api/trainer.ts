import errorHandle from "./error";
import axios from "axios";
import trainerRoutes from "@/services/endpoints/trainerEndPoints";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Api = axios.create({
  baseURL: `${BASE_URL}/trainer`,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      console.log("axio", data.message);
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

Api.interceptors.request.use(
  (config) => {
    const trainerDetails = JSON.parse(localStorage.getItem("trainerDetails"));
    const trainerToken = trainerDetails?.token;

    if (trainerToken) {
      config.headers["Authorization"] = `Bearer ${trainerToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface iTrainerLoginData {
  email: string;
  password: string;
}
export const trainerLogin = async (trainerData: iTrainerLoginData) => {
  try {
    const response = await Api.post(trainerRoutes.trainerLogin, trainerData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const trainerLogout = async () => {
  try {
    const response = await Api.post(trainerRoutes.trainerLogout);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
