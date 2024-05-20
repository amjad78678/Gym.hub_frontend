import errorHandle from "./error";
import adminRoutes from "@/services/endpoints/adminEndPoints";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Api = axios.create({
  baseURL: `${BASE_URL}/admin`,
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

export const getGymDetails = async () => {
  try {
    const response = await Api.get(adminRoutes.getGymDetails);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

interface reason {
  reason: string;
  type: string;
  id: number;
}
export const gymAdminResponse = async (res: reason) => {
  try {
    const response = await Api.put(adminRoutes.gymAdminResponse, res);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const blockAdminAction = async (id: string) => {
  try {
    const response = await Api.patch(adminRoutes.blockAdminAction(id));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const deleteGym = async (id: string) => {
  try {
    const response = await Api.delete(adminRoutes.deleteGym(id));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export interface iLogin {
  email: string;
  password: string;
}
export const adminLogin = async (data: iLogin) => {
  try {
    const response = await Api.post(adminRoutes.adminLogin, data);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const adminLogout = async () => {
  try {
    const response = await Api.post(adminRoutes.adminLogout);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await Api.get(adminRoutes.fetchUsers);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const updateUserAction = async ({ id, isBlocked, isDeleted }) => {
  try {
    const response = await Api.patch(adminRoutes.updateUser(id), {
      id,
      isBlocked,
      isDeleted,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchSubscriptions = async () => {
  try {
    const response = await Api.get(adminRoutes.fetchSubscriptions);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchGymWithId = async ({
  queryKey, 
}: QueryFunctionContext<[string, string | null]>) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [_, id] = queryKey;
    const response = await Api.get(adminRoutes.fetchGymWithId(id));
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
