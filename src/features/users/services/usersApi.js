import axiosInstance from "../../../services/api/axios";
import { ENDPOINTS } from "../../../services/endpoints";

export const getUsers = async () => {
  const response = await axiosInstance.get(ENDPOINTS.USERS.ALL);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.USERS.BY_ID(id),
    userData,
  );

  return response.data;
};

export const toggleUserRole = async (id, currentRole) => {
  const newRole = currentRole === "admin" ? "customer" : "admin";

  const response = await axiosInstance.patch(ENDPOINTS.AUTH.CHANGE_ROLE, {
    userId: id,
    role: newRole,
  });

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(ENDPOINTS.USERS.BY_ID(id));

  return response.data;
};

/*import axiosInstance from "../../../services/api/axios";
import { ENDPOINTS } from "../../../services/endpoints";

export const getUsers = async () => {
  const response = await axiosInstance.get(ENDPOINTS.USERS.ALL);
  return response.data;
  
};

export const updateUser = async (id, userData) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.USERS.BY_ID(id),
    userData
  );
  return response.data;
};

// تم تعديلها لتأخذ الدور الجديد مباشرة لتتوافق مع الـ UI المتفائل
export const toggleUserRole = async (id, newRole) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.AUTH.CHANGE_ROLE,
    {
      userId: id,
      role: newRole,
    }
  );
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(
    ENDPOINTS.USERS.BY_ID(id)
  );
  return response.data;
}; */
