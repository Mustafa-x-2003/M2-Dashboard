import {React,useState,useEffect} from "react";
import axiosInstance from "../../../services/api/axios";
import OrderStatus from "../components/OrderStatus";
function Dashboard() {
  const[dashboarddata,SetDashboarddata]=useState(null)
  const getDashboardData=async()=>{
    const res=await axiosInstance.get("/orders/admin/dashboard")
    console.log(res.data)
    SetDashboarddata(res.data.dashboard)
  }
  useEffect(()=>{
    getDashboardData()
  },[])
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl h-[600px] w-[50%] shadow-2xl p-6">
        <div className="w-[100%] flex items-center gap-31">
        <div>
        <h2 className="text-sky-300 text-sm tracking-[4px] uppercase">Order status</h2>
        <h2 className="mt-4 text-xl font-medium">Live fulfillment breakdown</h2>
        </div>
        <h6 className="bg-green-200 rounded-3xl p-2 font-light text-center m-auto w-fit text-[12px] text-green-600">Updated from API</h6>
        </div>
         <div className="grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-5 mt-5">
        <OrderStatus title="Pending" data={dashboarddata?.orders?.pending} color="amber"/>
        <OrderStatus title="Processing" data={dashboarddata?.orders?.processing} color="sky"/>
        <OrderStatus title="Confirmed" data={dashboarddata?.orders?.confirmed} color="sky"/>
        <OrderStatus title="Shipped" data={dashboarddata?.orders?.shipped} color="purple"/>
        <OrderStatus title="Delivered" data={dashboarddata?.orders?.delivered} color="green"/>
        <OrderStatus title="Cancelled" data={dashboarddata?.orders?.cancelled} color="rose"/>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
