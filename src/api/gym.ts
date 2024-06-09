import gymRoutes from "@/services/endpoints/gymEndPoints";
import errorHandle from "./error";
import axios from "axios";

interface gymRegisterData {
  gymName: string;
  email: string;
  contactNumber: number;
  state: string;
  city: string;
  pincode?: string;
  businessId?: string;
  dailyFee: number;
  monthlyFee: number;
  yearlyFee: number;
  description: string;
  password: string;
  confirmPassword: string;
  isVerified?: boolean;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  lat: number;
  long: number;
  address: string;
  images: any;
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
  _id?: string,
}



const BASE_URL = import.meta.env.VITE_BASE_URL
const Api = axios.create({baseURL:`${BASE_URL}/gym`,withCredentials:true})


Api.interceptors.response.use((response)=>{
   return response
}, (error) => {
    if(error.response){
        const {data}=error.response
        console.log('axio',data.message)  
    }else{
        console.log(error);
        
    }
    return Promise.reject(error)
})


Api.interceptors.request.use(
    (config) => {

      const gymDetails = JSON.parse(localStorage.getItem('gymDetails'));
      const gymToken = gymDetails?.token; 


      if (gymToken) {
        config.headers['Authorization'] = `Bearer ${gymToken}`;
    }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


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

export const fetchCoupons = async () => {
  try {
    const response = await Api.get(gymRoutes.fetchCoupons);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const addCoupon = async (data) => {
  try {
    const response = await Api.post(gymRoutes.addCoupon, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}
export const updateCoupon = async (data) => {
  try {
    const response = await Api.put(gymRoutes.updateCoupon, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const fetchGymData = async ()=>{
  try {
    const response = await Api.get(gymRoutes.fetchGymData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const fetchGymMembershipsBooked = async()=>{
  try {
    const response = await Api.get(gymRoutes.fetchBookedMemberships)
    return response
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const fetchDashboardDetails = async()=>{
  try {
    const response = await Api.get(gymRoutes.fetchDashboardDetails)
    return response
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const editGymProfile = async (data: any) => { 
  try {
    console.log('iam passing to server',data)
    const response = await Api.put(gymRoutes.editGymProfile, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }

}

export const editImageProfile= async (data: any)=>{
  try {
   console.log('iam in api',data)
    const response = await Api.patch(gymRoutes.editGymImages,data)
    return response
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}