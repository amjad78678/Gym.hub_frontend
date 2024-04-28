import { adminLogoout } from './admin';
import Api from "@/services/axios";
import errorHandle from "./error";
import adminRoutes from "@/services/endpoints/adminEndPoints";

export const getGymDetails = async () => {
    try {
        const response = await Api.get(adminRoutes.getGymDetails);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}


 interface reason {
    reason: string
    type: string,
    id: number
 }
export const gymAdminResponse = async (res: reason) => {

    try {
        const response = await Api.put(adminRoutes.gymAdminResponse,res);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}

export const blockAdminAction = async (id: string) => {
    

    try {
        const response = await Api.patch(adminRoutes.blockAdminAction(id));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);   
    }
}

export const deleteGym=async (id: string)=> {
    try {
        
        const response = await Api.delete(adminRoutes.deleteGym(id));
        return response;

    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);  
    } 
}

export interface iLogin {
    email: string;
    password: string;
}
export const adminLogin = async (data :iLogin) => {
    try {
        
        const response = await Api.post(adminRoutes.adminLogin,data);
        return response;

    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);  
    } 
}

export const adminLogout = async () => {
    
    try {
        
        const response = await Api.post(adminRoutes.adminLogout);
        return response;

    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);  
    }
}