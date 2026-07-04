import React from "react";
const AdminOverview=({title,title2,desc})=>{
    return(
        <div className="w-[95%] mx-auto rounded-2xl p-6 bg-white shadow-2xl">
        <h2 className="text-sky-300 tracking-[4px] capitalize text-lg">{title}</h2>
        <h2 className="font-bold text-2xl mt-2">{title2}</h2>
        <p className="mt-2 text-stone-400 font-light">{desc}</p>
        </div>
    )
}
export default AdminOverview;