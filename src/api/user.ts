import Api from "../services/axios";
import userRoutes from "@/services/endpoints/userEndPoints";
import errorHandle from "./error";

interface userFormData {
    username: string,
    email: string,
    mobilenumber: string,
    age: string,
    state: string,
    city: string,
    pincode: string,
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