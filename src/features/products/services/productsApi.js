import axiosInstance from "../../../services/api/interceptors";
import { ENDPOINTS } from "../../../services/endpoints";

const { PRODUCTS } = ENDPOINTS;

export const getAllProducts    = ()         => axiosInstance.get(PRODUCTS.BASE);
export const getProductById   = (id)       => axiosInstance.get(PRODUCTS.BY_ID(id));
export const searchProducts   = (query)    => axiosInstance.get(PRODUCTS.SEARCH, { params: { q: query } });
export const createProduct    = (data)     => axiosInstance.post(PRODUCTS.BASE, data);
export const updateProduct    = (id, data) => axiosInstance.patch(PRODUCTS.UPDATE(id), data);
export const deleteProduct    = (id)       => axiosInstance.delete(PRODUCTS.BY_ID(id));