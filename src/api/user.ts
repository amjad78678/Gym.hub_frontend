import Api from "../services/axios";
import userRoutes from "@/services/endpoints/userEndPoints";
import errorHandle from "./error";
import { QueryFunctionContext } from "@tanstack/react-query";

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

export const userLogout = async () => {

    try {
        const response = await Api.post(userRoutes.userLogout);
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}


export const fetchGymList= async () => {

    try {
        const response = await Api.get(userRoutes.fetchGymList);
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }

}
 export const fetchGymDetails= async ({queryKey}: QueryFunctionContext<[string, string | null]>) => {
        try {

           console.log('iam queryKey',queryKey)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
           const [_, id] = queryKey;
           if(id){

               const response = await Api.get(userRoutes.fetchGymDetails(id));
               return response
           }
        } catch (error) {
            const err: Error = error as Error;
            return errorHandle(err); 
        }
    }
   

