import Api from "../services/axios";
import userRoutes from "@/services/endpoints/userEndPoints";
import errorHandle from "./error";

interface userFormData {
    username?: string,
    email: string,
    mobileNumber?: string,
    age?: string,
    state?: string,
    city?: string,
    pincode?: string,
    gender?: string,
    password: string,
}


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
        const response = await Api.post(userRoutes.userOtpVerify, {otp});
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}

export const userOtpResend = async () => {

    try {
        const response = await Api.post(userRoutes.userOtpResend);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}

export const userLogin = async (loginData: userFormData)=>{

    try {
        const response = await Api.post(userRoutes.userLogin, loginData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}