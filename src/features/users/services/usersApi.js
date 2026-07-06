import axiosInstance from "../../../services/api/axios";
import { ENDPOINTS } from "../../../services/endpoints";

export const getUsers = async () => {
    const response = await axiosInstance.get(ENDPOINTS.USERS);

    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await axiosInstance.patch(
        ENDPOINTS.USER_BY_ID(id),
        userData
    );
    return response.data;
};