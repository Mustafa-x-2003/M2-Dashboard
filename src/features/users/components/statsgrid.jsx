import React, { useState, useEffect } from 'react';
import axios from '../../../services/api/axios'; 
import { FaUsers, FaUserShield, FaUserFriends, FaUserCheck } from 'react-icons/fa';
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

const StatsGrid = () => {
  const [statsData, setStatsData] = useState({
    total: 0,
    admins: 0,
    customers: 0,
    verified: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://e-commerce-api-3wara.vercel.app/users/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const users = response.data.users; 

    if (users && Array.isArray(users)) {
      const total = users.length;
      const admins = users.filter(u => u.role === 'admin').length;
      const customers = users.filter(u => u.role === 'customer').length;
      const verified = users.filter(u => u.isVerified === true).length;

      setStatsData({ total, admins, customers, verified });
    }
  } catch (error) {
    console.error("Error fetching statistics: ", error);
  }
};
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);
   
  const stats = [
    { title: "Total Users", value: statsData.total, icon: FaUsers, color: "bg-cyan-500" },
    { title: "Admins", value: statsData.admins, icon: FaUserShield, color: "bg-teal-500" },
    { title: "Customers", value: statsData.customers, icon: FaUserFriends, color: "bg-cyan-600" },
    { title: "Verified", value: statsData.verified, icon: FaUserCheck, color: "bg-cyan-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;