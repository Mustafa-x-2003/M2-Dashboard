import axiosInstance from "../../../services/api/axios";


export const GetProduct = async (productId)=>{
    const response = await axiosInstance.get(`/products/${productId}/`)
    return response.data
}
export const UpdateProduct = async (id, formData) => {
    console.log(id);
    console.log(formData);
    const { data } = await axiosInstance.patch(
        `/products/update/${id}`,
        formData,
        
    );

    return data;
};









