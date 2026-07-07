import { FaStore } from "react-icons/fa";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function AddProduct() {
    const navigate = useNavigate();
    return (
        <div className="mb-6 flex items-center justify-between bg-gradient-to-r from-cyan-50 to-teal-50 border border-teal-100 rounded-2xl px-6 py-5">
            <div className="flex items-center gap-4">
                <div className="bg-teal-100 text-teal-600 rounded-xl p-3">
                    <FaStore className="text-2xl" />
                </div>
                <div>
                    <p className="text-xs font-semibold tracking-widest text-teal-500 uppercase">Product Dashboard</p>
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                </div>
            </div>
            <button
                onClick={()=> navigate('/addProduct')}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-teal-200 transition-all duration-200"
            >
                <HiOutlinePlusSm className="text-xl" />
                Add Product
            </button>
        </div>
    )
}