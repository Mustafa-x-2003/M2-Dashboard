import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[var(--card)] p-6 rounded-3xl border border-[var(--border)] shadow-xl flex justify-between items-center transition-colors duration-300">
    <div>
      <p className="text-[var(--text-muted)] text-sm font-medium transition-colors duration-300">{title}</p>
      <h3 className="text-3xl font-bold text-[var(--text)] mt-1 transition-colors duration-300">{value}</h3>
    </div>
    <div className={`p-2 sm:p-3 rounded-2xl ${color}`}>
      <Icon size={24} className="text-white w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

export default StatCard;