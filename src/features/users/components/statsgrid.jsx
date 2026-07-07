import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserShield, FaUserFriends, FaUserCheck } from 'react-icons/fa';
import StatCard from './StatCard'; 
import { getAllUsers } from '../services/userStatus'; 
const StatsGrid = () => {
  const [statsData, setStatsData] = useState({ total: 0, admins: 0, customers: 0, verified: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getAllUsers(); 
        if (users && Array.isArray(users)) {
          setStatsData({
            total: users.length,
            admins: users.filter(u => u.role === 'admin').length,
            customers: users.filter(u => u.role === 'customer').length,
            verified: users.filter(u => u.isVerified === true).length
          });
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-4">
      {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
    </div>
  );
};

export default StatsGrid;