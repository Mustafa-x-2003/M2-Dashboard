import axiosInstance from "../../../services/api/axios";


export async function getDashboard() {
    const response = await axiosInstance.get("/orders/admin/dashboard")
    return response.data;
}
