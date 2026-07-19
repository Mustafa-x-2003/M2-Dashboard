

import { useState } from "react";
import {
    HiOutlineSearch,
    HiOutlineAdjustments,
    HiOutlineTag,
    HiOutlineViewGrid,
} from "react-icons/hi";

export default function SearchBar({
    query,
    setQuery,
    loading,
    cat,
    setCat,
    products,
}) {
    const [filter, setFilter] = useState(false);

    const categories = [
        "all",
        ...new Set(
            products
                .map((product) => product.category)
                .filter(Boolean)
        ),
    ];

    
    return (
        
        <div className="mb-5">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col gap-3 lg:flex-row">
                {/* Search Input */}
                <div className="flex flex-1 items-center rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <HiOutlineSearch className="mr-3 text-xl text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent text-sm outline-none dark:text-white"
                    />

                    {loading && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
                    )}
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setFilter(!filter)}
                        className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-medium transition
            ${filter
                            ? "border-cyan-500 bg-cyan-500 text-white"
                            : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark-border-2 dark:text-white"
                        }`}
                >
                    <HiOutlineAdjustments className="text-lg" />
                    Filters
                </button>

                {/* Search Button */}
                <button
                        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-white hover:bg-cyan-600 transition" 
                >
                    <HiOutlineSearch className="text-lg" />
                    Search
                </button>
            </div>

            {filter && (
                <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                                <HiOutlineTag />
                                Category
                            </label>

                                <select
                                    value={cat}
                                    onChange={(e) => setCat(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category === "all" ? "All Categories" : category}
                                        </option>
                                    ))}
                                </select>

                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                                <HiOutlineViewGrid />
                                Subcategory
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Smartphones"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-cyan-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}