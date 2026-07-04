import {ShoppingBag,Clock3,DollarSign,ShoppingCart,Package,Users} from "lucide-react";
import {React,useState,useEffect, use} from "react";
import StatsCard from "../components/StatsCard";
import axiosInstance from "../../../services/api/axios";
function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const getDashboardData=async()=>{
    const res=await axiosInstance.get("/orders/admin/dashboard")
    setDashboardData(res.data.dashboard)
    console.log(res.data.dashboard)
  }
  useEffect(()=>{
    getDashboardData();
  },[]);
  return (
    <div className="w-[90%] mx-auto grid grid-cols-3 grid-rows-2 gap-7">
      <StatsCard title="Total Orders" icon={<ShoppingBag/>} color="bg-gradient-to-br from-emerald-500 to-teal-500" data={dashboardData?.orders?.total??"..."} status="All orders received"/>
      <StatsCard title="Pending Orders" icon={<Clock3/>} color="bg-gradient-to-br from-orange-500 to-yellow-500" data={dashboardData?.orders?.pending} status="Awaiting action"/>
      <StatsCard title="Revenue" icon={<DollarSign/>} color="bg-gradient-to-br from-pink-500 to-rose-500" data={`$${dashboardData?.revenue?.total}`} status="Total gross revenue"/>
      <StatsCard title="This Month" icon={<ShoppingCart/>} color="bg-gradient-to-br from-cyan-500 to-sky-500" data={`$${dashboardData?.revenue?.thisMonth}`} status="Monthly sales target"/>
      <StatsCard title="Top Product" icon={<Package/>} color="bg-gradient-to-br from-violet-500 to-fuchsia-500" data={dashboardData?.topProducts[0]?.name} status={`${dashboardData?.topProducts[0]?.totalSold} sold`}/>
      <StatsCard title="Users" icon={<Users/>} color="bg-gradient-to-br from-slate-400 to-slate-600" data={dashboardData?.totalCustomers} status="Registered customers"/>
    </div>
  );
}

export default Dashboard;
