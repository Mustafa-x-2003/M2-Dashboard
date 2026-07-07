import { useState } from "react"
import { HiOutlineSearch, HiOutlineAdjustments } from "react-icons/hi"
import FilterSearch from "./filterSearch";

export default function SearchBar({ query, setQuery, loading, cat, setCat, products }) {
    const [filter, setFilter] = useState(false)

    return (
        <div className="mb-4">
            
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-sm transition-colors duration-300">
                
                <HiOutlineSearch className="text-gray-400 dark:text-gray-500 text-xl flex-shrink-0" />

                
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                />

                
                {loading && (
                    <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}

                
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-1 flex-shrink-0" />

                
                <button
                    onClick={() => setFilter(!filter)}
                    className={`flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-xl transition-all duration-200 flex-shrink-0
                        ${filter
                            ? "bg-teal-500 text-white shadow-md shadow-teal-200 dark:shadow-teal-900/40"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                >
                    <HiOutlineAdjustments className="text-base" />
                    Filters
                </button>

            
            </div>

            
            {filter && <FilterSearch cat={cat} setCat={setCat} products={products} />}
        </div>
    )
}