import { React, useState, useEffect } from "react";
const StatsCard = ({ title, icon, data, color, status }) => {
  return (
    <div className="bg-[var(--card)] border-[var(--border)]  rounded-2xl px-5 pt-6 relative overflow-hidden h-fit shadow-[var(--shadow)] h-full hover:-translate-y-2 transition-all duration-300">
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
      <div className="flex justify-between gap-4">
        <div>
          <h2 className="text-[var(--text-secondary)] text-sm font-bold truncate max-w-[140px]">
            {title}
          </h2>

          <h2 className="text-3xl transition-all duration-300 text-[var(--text)] py-2 font-bold">
            {data}
          </h2>
          <h2 className="text-sm text-[var(--text-secondary)] transition-all duration-300 font-light ">
            {status}
          </h2>
        </div>
        <div
          className={`${color} p-4 rounded-2xl justify-center h-full mt-3 transition-transform duration-300 hover:rotate-12`}
        >
          {icon}
        </div>
      </div>
      <div className=" my-4 py-[.5px] h-px bg-gradient-to-r transition-all duration-300 from-transparent via-[var(--border)] to-transparent via-[var(--border)]"></div>
    </div>
  );
};
export default StatsCard;
