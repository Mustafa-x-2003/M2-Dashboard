import axiosInstance from "../../../services/api/axios";


export const GetProduct = async (productId)=>{
    const response = await axiosInstance.get(`/products/${productId}/`)
    return response.data
}
export const UpdateProduct = async  (productId , data)=>{
    const response = await axiosInstance.patch(`/products/update/${productId}` , data)
    return response.data
}