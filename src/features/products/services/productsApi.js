import axiosInstance from "../../../services/api/interceptors";
import { ENDPOINTS } from "../../../services/endpoints";


export const getAllProducts = (signal) =>
  axiosInstance.get(ENDPOINTS.PRODUCTS.BASE, { signal });
export const getProductById = (id) =>
  axiosInstance.get(ENDPOINTS.PRODUCTS.BY_ID(id));
export const searchProducts = (params, signal) =>
  axiosInstance.get(ENDPOINTS.PRODUCTS.SEARCH, { params, signal });
export const createProduct = (data) =>
  axiosInstance.post(ENDPOINTS.PRODUCTS.BASE, data);
export const updateProduct = (id, data) =>
  axiosInstance.patch(ENDPOINTS.PRODUCTS.UPDATE(id), data);
export const deleteProduct = (id) =>
  axiosInstance.delete(ENDPOINTS.PRODUCTS.PRODUCTSBY_ID(id));
