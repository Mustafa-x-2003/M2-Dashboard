// const API_BASE_URL = "https://e-commerce-api-3wara.vercel.app";

// export const getProductById = async (productId) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch product");
//     }

//     const data = await response.json();
//     return data.product;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw error;
//   }
// };

const API_BASE_URL = "https://e-commerce-api-3wara.vercel.app";

/**
 * Get all products
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Get single product by ID (frontend filter solution)
 */
export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    const product = data.products.find((item) => item._id === productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
