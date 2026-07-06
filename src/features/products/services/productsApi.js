import axiosInstance from '../../../services/api/interceptors';

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

  const response = await axiosInstance.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}
