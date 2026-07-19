import { HiOutlineTag, HiOutlineViewGrid } from "react-icons/hi";

export default function FilterSearch({
    cat,
    setCat,
    products,
}) {
    const categories = [...new Set(products.map((product) => product.category))];

    return (
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Category */}
                <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <HiOutlineTag className="text-base" />
                        Category
                    </label>

                    <select
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    >
                        <option value="all">All Categories</option>

                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <HiOutlineViewGrid className="text-base" />
                        Subcategory
                    </label>

                    <input
                        type="text"
                        placeholder="Coming Soon..."
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-400 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500"
                    />
                </div>
            </div>
        </div>
    );
}