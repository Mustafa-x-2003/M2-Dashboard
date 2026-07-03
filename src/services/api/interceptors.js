
import axiosInstance from "./axios"
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("🔐 TOKEN:", token);
  console.log("➡️ REQUEST:", config.url);

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});
export default axiosInstance
