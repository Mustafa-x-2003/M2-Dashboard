import axiosInstance from '../../../services/api/axios';

export const addUser = async (userData) => {
  const token = localStorage.getItem('token'); 
  
  try {
    const response = await axiosInstance.post('/users/add', userData, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to add user");
  }
};