import {React,useState,useEffect} from "react";
const StatsCard=({title,icon,data,color,status})=>{
    return (
        <div className="bg-[var(--card)] border-[var(--border)]  rounded-2xl px-5 pt-6 relative overflow-hidden h-fit shadow-[var(--shadow)] hover:-translate-y-2 transition-all duration-300">
            <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
            <div className="flex justify-between gap-4">
            <div>
                <h2 className="text-slate-500 text-sm font-bold mt-1">{title}</h2>
                <h2 className="text-3xl mt-1 font-bold">{data}</h2>
                <h2 className="text-sm text-slate-400 font-light mt-1">{status}</h2>
            </div>
            <div className={`${color} p-4 rounded-2xl justify-center h-full mt-3 transition-transform duration-300 hover:rotate-12`}>
                {icon}
            </div>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-900 mb-7"></div>
        </div>
    )
}
export default StatsCard;