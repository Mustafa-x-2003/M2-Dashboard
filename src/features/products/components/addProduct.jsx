import { FaStore } from "react-icons/fa";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function AddProduct() {
    const navigate = useNavigate();

    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <div className="rounded-xl bg-[#132943] p-3 text-cyan-500">
                    <FaStore className="text-2xl" />
                </div>

                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">
                        Product Dashboard
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-[var(--text)]">
                        Products
                    </h2>
                </div>
            </div>

            <button
                onClick={() => navigate("/products/add")}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-cyan-600 active:scale-95 sm:w-auto"
            >
                <HiOutlinePlusSm className="text-xl" />
                Add Product
            </button>
        </div>
    );
}