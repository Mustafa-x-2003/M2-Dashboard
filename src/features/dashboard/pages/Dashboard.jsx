import {React,useState,useEffect, use} from "react";
import { getDashboardData } from "../services/dashboard.service";
import StatusCardsSection from "../components/StatusCardsSection";
function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const fetchDashboardData=async()=>{
    try {
    const data = await getDashboardData();
    setDashboardData(data);
  } catch (error) {
    console.error(error);
  }
  }
  useEffect(()=>{
    fetchDashboardData();
  },[]);
  return (
    <StatusCardsSection dashdata={dashboardData}/>
  );
}

export default Dashboard;
