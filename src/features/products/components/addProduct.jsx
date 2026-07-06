import { FaStore} from "react-icons/fa";

export default function AddProduct({addProduct}){
    return(
        <div className="mb-4 flex  justify-between">
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 gap-2">
                <FaStore className="text-gray-500 text-5xl"/>
                <div>
                    <p className="text-gray-500 text-2xl">DashBoard</p>
                    <p className="text-xl">Products</p>
                   
                </div>
            </div>
            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}