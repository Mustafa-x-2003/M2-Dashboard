const API_BASE_URL = "https://e-commerce-api-3wara.vercel.app";

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
