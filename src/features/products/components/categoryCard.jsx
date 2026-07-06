export default function CategoryCard({cat}){
    return(
        <div className="p-[4px]  border-1 rounded-2xl hover:scale-105 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-300">
            <p className="text-gray-500 hover:text-black transition-all duration-300 text-sm">{cat}</p>
        </div>
    )
}