import React from "react";
import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardApi";
import TopProduct from "../components/TopProduct/TopProduct";
// import OrderStatus from '../components/OrderStatus';
import RecentOrders from "../components/RecentOrder/RecentOrders";
function Dashboard() {
  return (

   

    <div className="p-4 md:p-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 ">
        {/* <OrderStatus /> */}
        <TopProduct dashboard={dashboard} />
      </div>

      <div className="mt-6">
        <RecentOrders dashboard={dashboard} />
      </div>

    </div>
  );
}

export default Dashboard;
