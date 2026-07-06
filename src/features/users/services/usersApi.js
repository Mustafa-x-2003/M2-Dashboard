import axiosInstance from "../../../services/api/axios";
import { ENDPOINTS } from "../../../services/endpoints";

export const getUsers = async () => {
  const response = await axiosInstance.get(ENDPOINTS.USERS);

  return response.data;
};