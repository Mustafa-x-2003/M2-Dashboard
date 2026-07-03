import axiosInstance from "../../services/api/axios";

export const getAdminOrders = async () => {
  const response = await axiosInstance.get("/orders/admin");

    
  return response.data;
};


export const updateOrderStatus = async (
  orderId,
  status,
  adminNote
) => {
  const response = await axiosInstance.patch(
    `/orders/admin/${orderId}/status`,
    {
      status,
      adminNote,
    }
  );

  return response.data;
};