import { FaStore } from "react-icons/fa";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function AddProduct() {
    const navigate = useNavigate();
    return (
        <div className="mb-6 flex items-center justify-between bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 border border-teal-100 dark:border-gray-700 rounded-2xl px-6 py-5 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-xl p-3">
                    <FaStore className="text-2xl" />
                </div>
                <div>
                    <p className="text-xs font-semibold tracking-widest text-teal-500 dark:text-teal-400 uppercase">Product Dashboard</p>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products</h1>
                </div>
            </div>
            <button
                onClick={()=> navigate('/addProduct')}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-teal-200 dark:shadow-teal-900/40 transition-all duration-200"
            >
                <HiOutlinePlusSm className="text-xl" />
                Add Product
            </button>
        </div>
    )
}