import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardApi";
// import OrderStatus from "../components/OrderStatue/OrderStatus";
import TopProduct from "../components/TopProduct/TopProduct";
import RecentOrders from "../components/RecentOrder/RecentOrders";
function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await getDashboard();
      setDashboard(data.dashboard);
    };

    fetchDashboard();
  }, []);


  return (
    <div className="p-4 md:p-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 ">
        {/* <OrderStatus /> */}
        <TopProduct dashboard={dashboard} />
      </div>

      <div className="mt-6 w-full">
        <RecentOrders dashboard={dashboard} />
      </div>

    </div>
  );
}

export default Dashboard;
