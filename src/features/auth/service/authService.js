import axiosInstance from "../../../services/api/interceptors";

export const login = async (email, password) => {
  const { data } = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return data;
};


export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  
  
  return data;
};
