export default function SearchBar({query , setQuery , loading}){
    return(
        <div  className="flex max-w-lg mx-auto py-6 ">
            <input type="text"
             value={query} 
             onChange={(e)=>setQuery(e.target.value)}
             placeholder="Search products by name"
             className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
             />
              {loading && <div className="ml-2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>}
        </div>
    )
}