import { useState } from "react"
import { HiOutlineSearch, HiOutlineAdjustments } from "react-icons/hi"
import FilterSearch from "./filterSearch";

export default function SearchBar({ query, setQuery, loading, cat, setCat, products }) {
    const [filter, setFilter] = useState(false)

    return (
        <div className="mb-4">
            
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                
                <HiOutlineSearch className="text-gray-400 text-xl flex-shrink-0" />

                
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />

                
                {loading && (
                    <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}

                
                <div className="w-px h-6 bg-gray-200 mx-1 flex-shrink-0" />

                
                <button
                    onClick={() => setFilter(!filter)}
                    className={`flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-xl transition-all duration-200 flex-shrink-0
                        ${filter
                            ? "bg-teal-500 text-white shadow-md shadow-teal-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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