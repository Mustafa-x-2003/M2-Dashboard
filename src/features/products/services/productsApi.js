import axiosInstance from "../../../services/api/interceptors";
import { ENDPOINTS } from "../../../services/endpoints";


export const getAllProducts = (signal) =>
  axiosInstance.get(ENDPOINTS.PRODUCTS.BASE, { signal });
export const getProductById = (id) =>
  axiosInstance.get(ENDPOINTS.PRODUCTS.BY_ID(id));
export const searchProducts = (params, signal) =>
  axiosInstance.get(ENDPOINTS.PRODUCTS.SEARCH, { params, signal });
export const updateProduct = (id, data) =>
  axiosInstance.patch(ENDPOINTS.PRODUCTS.UPDATE(id), data);
export const deleteProduct = (id) =>
  axiosInstance.delete(ENDPOINTS.PRODUCTS.BY_ID(id));


export async function createProduct(fields, tags, images) {
  const formData = new FormData();

  // Required text fields
  formData.append('name', fields.name);
  formData.append('shortDescription', fields.shortDescription);
  formData.append('description', fields.description);
  formData.append('price', fields.price);
  formData.append('stock', fields.stock);
  formData.append('category', fields.category);

  // Optional text fields
  if (fields.discountPrice) formData.append('discountPrice', fields.discountPrice);
  if (fields.sku)           formData.append('sku', fields.sku);
  if (fields.subcategory)   formData.append('subcategory', fields.subcategory);
  if (fields.brand)         formData.append('brand', fields.brand);

  // Booleans
  formData.append('featured', fields.featured ? 'true' : 'false');
  formData.append('isActive', fields.isActive  ? 'true' : 'false');

  // tags
  if (tags && tags.length > 0) {
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
      formData.append('tags', tag);
    });
  } else {
  }
  // Images (File objects)
  images.forEach((file) => formData.append('images', file));

  const response = await axiosInstance.post(ENDPOINTS.PRODUCTS.BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}
