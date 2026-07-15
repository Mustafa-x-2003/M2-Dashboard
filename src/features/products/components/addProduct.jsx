import { FaStore } from "react-icons/fa";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function AddProduct() {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between  bg-[var(--card)]   border border-[var(--border)] rounded-3xl p-6 transition-colors duration-300">
      <div className="flex  items-center gap-4">
        <div className="bg-[#132943] text-cyan-500 rounded-xl p-3">
          <FaStore className="text-2xl" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">
            Product Dashboard
          </p>
          <h2 className="text-3xl font-bold text-[var(--text)] mt-2">
            Products
          </h2>
        </div>
      </div>
      <button
        onClick={() => navigate("/addProduct")}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 active:scale-95 transition text-white px-6 py-3 rounded-2xl font-semibold shadow-md cursor-pointer"
      >
        <HiOutlinePlusSm className="text-xl" />
        Add Product
      </button>
    </div>
  );
}
