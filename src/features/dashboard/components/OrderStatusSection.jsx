import React from "react";
import OrderStatus from "./OrderStatus";
import DashboardOverviewGrid from "./DashboardOverviewGrid/DashboardOverviewGrid";
const OrderStatusSection=({dashdata})=>{
    return (
    <div className="w-full">
      <DashboardOverviewGrid title="Order status" subtitle="Live fulfillment breakdown" badge={<h6 className="bg-green-200 rounded-3xl p-2 font-light text-center w-fit text-[12px] text-green-600">Updated from API</h6>}>
        <div className="grid grid-cols-1 grid-rows-6 gap-y-5 gap-x-5 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
       <OrderStatus title="Pending" data={dashdata?.orders?.pending} color="amber"/>
        <OrderStatus title="Processing" data={dashdata?.orders?.processing} color="sky"/>
        <OrderStatus title="Confirmed" data={dashdata?.orders?.confirmed} color="sky"/>
        <OrderStatus title="Shipped" data={dashdata?.orders?.shipped} color="purple"/>
        <OrderStatus title="Delivered" data={dashdata?.orders?.delivered} color="green"/>
         <OrderStatus title="Cancelled" data={dashdata?.orders?.cancelled} color="rose"/>
       </div>
      </DashboardOverviewGrid>
    </div>
  );
}
export default OrderStatusSection
// grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-5 mt-5 