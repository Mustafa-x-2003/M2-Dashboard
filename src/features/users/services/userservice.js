import axios from '../../../services/api/axios';
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('https://e-commerce-api-3wara.vercel.app/users/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.users;
};