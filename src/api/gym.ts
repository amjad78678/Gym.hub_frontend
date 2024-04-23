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
  
export const gymRegister=async (gymData :gymRegisterData)=>{

    try {
        const response = await Api.post(gymRoutes.gymRegister, gymData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}

export const gymOtpVerifyApi=async (otp :number)=>{

    try {
        const response = await Api.post(gymRoutes.gymOtpVerify, {otp});
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
    
}

export const gymOtpResend = async () => {

    try {
        const response = await Api.post(gymRoutes.gymOtpResend);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}