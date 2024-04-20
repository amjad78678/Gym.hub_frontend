import { AxiosError } from "axios";
import toast from "react-hot-toast";


interface iErrorResponse {
    message: string;
}
const errorHandle=(error: Error | AxiosError)=>{


    const axiosError = error as AxiosError;

    if(axiosError.response?.data){

        const errorResponse = axiosError.response.data as iErrorResponse;

        if(errorResponse.message){
            toast.error(errorResponse.message)
        }else{
            console.log('Error response has no message');

        }
    }else{

        toast.error('An error occurred. Please try again!');
        console.log('axiosError',axiosError.message);
    }

}

export default errorHandle;