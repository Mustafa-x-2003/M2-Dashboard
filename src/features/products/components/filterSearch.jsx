import { HiOutlineTag, HiOutlineViewGrid } from "react-icons/hi"
import {useProducts} from "../hooks/useProducts"

export default function FilterSearch({ cat, setCat, }) {
    const {products} = useProducts()
    const categories = [...new Set(products.map(product => product.category))];

    return (
        <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mt-3 shadow-sm transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        <HiOutlineTag className="text-base" />
                        Category
                    </label>
                    <select
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 cursor-pointer transition-all duration-200"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        <HiOutlineViewGrid className="text-base" />
                        Subcategory
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. smartphones"
                        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200"
                    />
                </div>
            </div>
        </div>
    )
}