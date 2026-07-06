import React from 'react';
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex justify-between items-center">
    <div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-2xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);
export default StatCard;