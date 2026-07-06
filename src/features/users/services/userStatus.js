import axiosInstance from '../../../services/api/axios'; 
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/users/all', { 
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.users;
};