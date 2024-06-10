import userRoutes from "@/services/endpoints/userEndPoints";
import errorHandle from "./error";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import iUserChat from "@/interfaces/iUserChat";
import iEditProfile from "@/interfaces/iEditProfile";

interface userFormData {
  username?: string;
  email: string;
  mobileNumber?: string;
  age?: string;
  state?: string;
  city?: string;
  pincode?: string;
  gender?: string;
  password: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Api = axios.create({
  baseURL: `${BASE_URL}/user`,
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
    const userDetails = JSON.parse(localStorage.getItem("userDetails") as string);
    const userToken = userDetails?.token;

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signUp = async (userData: userFormData) => {
  try {
    const response = await Api.post(userRoutes.signup, userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const userOtpVerify = async (otp: number) => {
  try {
    const response = await Api.post(userRoutes.userOtpVerify, { otp });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const userOtpResend = async () => {
  try {
    const response = await Api.post(userRoutes.userOtpResend);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const userLogin = async (loginData: userFormData) => {
  try {
    const response = await Api.post(userRoutes.userLogin, loginData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const userLogout = async () => {
  try {
    const response = await Api.post(userRoutes.userLogout);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchNearGymList = async ({ latitude, longitude, page,search,sliderValue }) => {
  try {
    const response = await Api.get(
      userRoutes.fetchNearGymList(latitude, longitude,page,search,sliderValue)
    );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const fetchGymList = async () => {
  try {
    const response = await Api.get(userRoutes.fetchGymList);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const fetchGymDetails = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, id] = queryKey;
    if (id) {
      const response = await Api.get(userRoutes.fetchGymDetails(id));
      return response;
    }
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await Api.post(userRoutes.forgotPassword, { email });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const verifyForgotPassword = async (otp: number) => {
  try {
    const response = await Api.post(userRoutes.verifyForgotPassword, { otp });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const updatePassword = async (password: string) => {
  try {
    const response = await Api.patch(userRoutes.updataPasswordForgot, {
      password,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const resendForgotOtp = async () => {
  try {
    const response = await Api.post(userRoutes.resendForgotOtp);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const addToCart = async (data: any) => {
  try {
    const response = await Api.post(userRoutes.addToCart, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getCheckoutData = async () => {
  try {
    const response = await Api.get(userRoutes.getCheckoutDetails);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const addNewSubscription = async (data: any) => {
  try {
    const response = await Api.post(userRoutes.addNewSubscription, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const validateCoupon = async (data: any) => {
  try {
    const response = await Api.post(userRoutes.validateCoupon, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const fetchUserDetails = async () => {
  try {
    const response = await Api.get(userRoutes.fetchUserDetails);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const addMoneyWallet = async (data: any) => {
  try {
    const response = await Api.post(userRoutes.addMoneyWallet, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const fetchSubscriptions = async () => {
  try {
    const response = await Api.get(userRoutes.fetchSubscriptions);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchTrainers =  async ({page,search,sliderValue,experience}) => {
  try {
    const response = await Api.get(userRoutes.fetchTrainers(page,search,sliderValue,experience));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const bookTrainer = async (data: any) => {
  try {
    const response = await Api.post(userRoutes.bookTrainer, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchBookedTrainers = async () => {
  try {
    const response = await Api.get(userRoutes.fetchBookedTrainers);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const userChatCreate = async (data: iUserChat) => {
  try {
    const response = await Api.post(userRoutes.userChatCreate, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchUserChatMessages = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null, string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, senderId, receiverId] = queryKey;
    const response = await Api.get(
      userRoutes.fetchUserChatMessages(senderId, receiverId)
    );
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchTrainerData = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, id] = queryKey;
    const response = await Api.get(userRoutes.fetchTrainerData(id));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const editProfile = async (data: any) => {
  try {
    const response = await Api.post(userRoutes.editProfile, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const isReviewPossible = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, id] = queryKey;
    const response = await Api.get(userRoutes.isReviewPossible(id as string));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const addRatingGym = async (data) => {
  try {
    const response = await Api.post(userRoutes.addRatingGym, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchGymReviews = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, id] = queryKey;
    const response = await Api.get(userRoutes.fetchGymReviews(id as string));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const updateRating = async (data) => {
  try {
    const response = await Api.post(userRoutes.updateRating, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const getWorkoutsBodyList = async () => {
  try {
    const response = await Api.get(userRoutes.getWorkoutsBodyList);
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
    const response = await Api.get(userRoutes.getWorkoutDetails(bodyPart));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchBannersData = async () => {
  try {
    const response = await Api.get(userRoutes.getBanners);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fileUploadChat = async (file: any) =>{
  try {
    const response = await Api.post(userRoutes.uploadChatFiles, file);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const fetchMaxPriceGym = async () =>{
  try {
    const response = await Api.get(userRoutes.fetchMaxPriceGym)
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const fetchMaxPriceTrainer = async () =>{
  try {
    const response = await Api.get(userRoutes.fetchMaxPriceTrainer)
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}