import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface iErrorResponse {
  message: string;
}
const errorHandle = (error: Error | AxiosError) => {
  const axiosError = error as AxiosError;
  if (axiosError.response?.data) {
    const errorResponse = axiosError.response.data as iErrorResponse;
    if (errorResponse.message.includes("Not authorized")) {
      toast.error("Please login before proceeding");
    } else if (errorResponse.message.includes("You are blocked by admin")) {
      localStorage.removeItem("uLoggedIn");
      localStorage.removeItem("userDetails");
      window.location.href = window.location.href;
    } else {
      toast.error(errorResponse.message);
    }
  } else {
    toast.error("An error occurred. Please try again!");
  }
};

export default errorHandle;
