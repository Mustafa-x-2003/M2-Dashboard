import axiosInstance from "../../../services/api/axios";
  const getDashboardData=async()=>{
    const res=await axiosInstance.get("/orders/admin/dashboard")
    return res.data.dashboard;
  }
export default getDashboardData