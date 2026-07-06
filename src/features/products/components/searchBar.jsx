import { useState } from "react"
import { GiSettingsKnobs } from "react-icons/gi";
import FilterSearch from "./filterSearch";
export default function SearchBar({query , setQuery , loading, cat, setCat}){
    const [filter , setFilter] = useState(false)
    return(
        <div  className="flex  mx-auto py-6 ">
            <input type="text"
             value={query} 
             onChange={(e)=>setQuery(e.target.value)}
             placeholder="Search products by name"
             className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
             />
              {loading && <div className="ml-2">
                <div className="w-5 h-5 mt-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>}
              <div>
                <button onClick={()=>setFilter(!filter)} className="ml-2 border px-6 mt-1 bg-blue-600 text-white p-3 rounded-2xl hover:cursor-pointer  hover:scale-105 transition-all duration-300 "><GiSettingsKnobs/> </button>
              </div>
              {filter && <FilterSearch cat={cat} setCat={setCat} />}
        </div>
    )
}