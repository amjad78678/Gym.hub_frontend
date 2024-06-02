import errorHandle from "./error";
import axios from "axios";
import trainerRoutes from "@/services/endpoints/trainerEndPoints";
import { QueryFunctionContext } from "@tanstack/react-query";

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

export const tForgotPassword = async (email: string) => {
  try {
    const response = await Api.post(trainerRoutes.forgotPassword, { email });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const tVerifyForgotPassword = async (otp: number) => {
  try {
    const response = await Api.post(trainerRoutes.verifyForgotPassword, {
      otp,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const tUpdatePassword = async (password: string) => {
  try {
    const response = await Api.patch(trainerRoutes.updataPasswordForgot, {
      password,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const tResendForgotOtp = async () => {
  try {
    const response = await Api.post(trainerRoutes.resendForgotOtp);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchALlMessages = async () => {
  try {
    const response = await Api.get(trainerRoutes.fetchAllMessages);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const trainerChatCreate = async (data) => {
  try {
    const response = await Api.post(trainerRoutes.trainerChatCreate, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  } 
};

export const fetchTrainerChats = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null,string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, senderId,receiverId] = queryKey;
    const data={trainerId: senderId,receiverId}
    const response = await Api.get(trainerRoutes.fetchTrainerChats(data));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchUserData = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, id] = queryKey;
    const response = await Api.get(trainerRoutes.fetchUserData(id as string));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }


};
export const fetchTrainertrainerBookings = async()=>{
  try {
    const response = await Api.get(trainerRoutes.fetchSubscriptions)
    return response
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}