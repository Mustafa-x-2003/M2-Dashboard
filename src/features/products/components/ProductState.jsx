export default function ProductState({logo , number , title}){
    return(
        <div className="flex flex-col items-center bg-blue-600 p-6 rounded-lg ">
            <div className="text-5xl text-white mb-3">
                {logo}
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{number}</h3>
            <span className="text-sm text-white font-medium">{title}</span>
        </div>
    )
}