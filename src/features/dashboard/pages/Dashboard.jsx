import {React,useState,useEffect} from "react";
import getDashboardData from "../services/dashboard.service";
import OrderStatusSection from "../components/OrderStatusSection";
function Dashboard() {
  const[dashboardData,SetDashboardData]=useState(null)
  const fetchDashboardData = async () => {
  try {
    const data = await getDashboardData();
    setDashboardData(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchDashboardData();
}, []);
  return (
    <OrderStatusSection dashdata={dashboardData}/>
  );
}

export default Dashboard;
