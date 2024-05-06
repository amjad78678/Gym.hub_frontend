import Api from "@/services/axios";
import gymRoutes from "@/services/endpoints/gymEndPoints";
import errorHandle from "./error";

interface gymRegisterData {
  gymName: string;
  email: string;
  contactNumber: number;
  state: string;
  city: string;
  pincode?: string;
  businessId?: string;
  subscriptions: {
    quarterlyFee: number;
    monthlyFee: number;
    yearlyFee: number;
  };
  description: string;
  password: string;
  confirmPassword: string;
  isVerified?: boolean;
  location: {
    type: string;
    coordinates: [number, number];
  };
  images: {
    imageUrl: string;
    public_id: string;
  }[];
}


interface iTrainer {
    
  name?: string,
  gender?: string,
  age?: number,
  experience?: number,
  achievements?: string,
  monthlyFee?: number,
  yearlyFee?: number,
  email?: string,
  password?: string,
  isBlocked: boolean,
  isDeleted: boolean,
  _id?: any,
}



export const gymRegister = async (gymData: gymRegisterData) => {
  try {
    const response = await Api.post(gymRoutes.gymRegister, gymData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);  
  }
};

export const gymOtpVerifyApi = async (otp: number) => {
  try {
    const response = await Api.post(gymRoutes.gymOtpVerify, { otp });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const gymOtpResend = async () => {
  try {
    const response = await Api.post(gymRoutes.gymOtpResend);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const gymLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await Api.post(gymRoutes.gymLogin, { email, password });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const gymLogout = async () => {
  try {
    const response = await Api.post(gymRoutes.gymLogout);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


interface iEditSubscription {

  subscription: string | null,
  amount: string | null
}

export const editGymSubscription = async (data: iEditSubscription)=>{
  try {

    const response = await Api.patch(gymRoutes.editGymSubscription, data)
    return response
    
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const fetchGymSubscription = async () => {
  try {
    const response= await Api.get(gymRoutes.fetchGymSubscription)
    return response
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}
export const gForgotPassword = async (email: string) => {
  try {
    const response = await Api.post(gymRoutes.forgotPassword, { email });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }

};
export const gVerifyForgotPassword = async (otp: number) => {
    try {
      
        const response = await Api.post(gymRoutes.verifyForgotPassword, { otp });
        return response;

    } catch (error) {
      
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

export const gUpdatePassword = async (password: string) => {
    try {
        
        const response = await Api.patch(gymRoutes.updataPasswordForgot, {password});
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}


export const gResendForgotOtp = async () => {
    
    try {
        const response = await Api.post(gymRoutes.resendForgotOtp);
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
   
}
export const fetchTrainers = async () => {
  try {
      const response= await Api.get(gymRoutes.fetchTrainers)
      return response
  } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err); 
  }
}

export const addTrainer = async (data: iTrainer) => {
  try {
    const response= await Api.post(gymRoutes.addTrainer,data)
    return response
  }catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}
 
export const updateTrainer = async (data) => {
  try {

    const response = await Api.put(gymRoutes.updateTrainer, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}