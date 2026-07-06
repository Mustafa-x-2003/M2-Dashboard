import React from "react";
import StatsCard from "./StatsCard";
import { FaCartShopping } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
const StatusCardsSection=({dashdata})=>{
    return(
    <div className="w-full mx-auto grid grid-cols-3 grid-rows-2 gap-7">
      <StatsCard title="Total Orders" icon={<FiShoppingBag/>} color="bg-gradient-to-br from-emerald-500 to-teal-500" data={dashdata?.orders?.total??"..."} status="All orders received"/>
      <StatsCard title="Pending Orders" icon={<IoTimeOutline/>} color="bg-gradient-to-br from-orange-500 to-yellow-500" data={dashdata?.orders?.pending} status="Awaiting action"/>
      <StatsCard title="Revenue" icon={<FiDollarSign/>} color="bg-gradient-to-br from-pink-500 to-rose-500" data={`$${dashdata?.revenue?.total}`} status="Total gross revenue"/>
      <StatsCard title="This Month" icon={<FaCartShopping/>} color="bg-gradient-to-br from-cyan-500 to-sky-500" data={`$${dashdata?.revenue?.thisMonth}`} status="Monthly sales target"/>
      <StatsCard title="Top Product" icon={<BsBoxSeam/>} color="bg-gradient-to-br from-violet-500 to-fuchsia-500" data={dashdata?.topProducts?.[0]?.name} status={`${dashdata?.topProducts?.[0]?.totalSold} sold`}/>
      <StatsCard title="Users" icon={<FiUsers/>} color="bg-gradient-to-br from-slate-400 to-slate-600" data={dashdata?.totalCustomers} status="Registered customers"/>
    </div>
    )
}
export default StatusCardsSection