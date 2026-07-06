import {React,useState,useEffect} from "react";
const StatsCard=({title,icon,data,color,status})=>{
    return (
        <div className="bg-white border-slate-200/70 dark:bg-slate-900 dark:border-slate-800 rounded-2xl px-5 pt-6 relative overflow-hidden h-[220px] hover:shadow-lg hover:shadow-slate-400 hover:-translate-y-2 transition-all duration-500">
            <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
            <div className="flex justify-between gap-4">
            <div>
                <h2 className="text-slate-500 text-sm font-bold mt-3">{title}</h2>
                <h2 className="text-3xl mt-3 font-bold">{data}</h2>
                <h2 className="text-sm text-slate-400 font-light mt-3">{status}</h2>
            </div>
            <div className={`${color} p-4 rounded-2xl justify-center h-full mt-3 transition-transform duration-300 hover:rotate-12`}>
                {icon}
            </div>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-900"></div>
        </div>
    )
}
export default StatsCard;