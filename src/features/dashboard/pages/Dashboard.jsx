import React, { useEffect, useState } from "react";
import AdminOverview from "../components/AdminOverview";
import { getDashboard } from "../services/dashboardApi";
import StatusCardsSection from "../components/StatusCardsSection";
import OrderStatusSection from "../components/OrderStatusSection";
import TopProduct from "../components/TopProduct/TopProduct";
import RecentOrders from "../components/RecentOrder/RecentOrders";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data.dashboard);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="pt-4">
      <StatusCardsSection dashdata={dashboard} />
    <div>
      <AdminOverview />

      <div className="p-4 md:p-8">
        <StatusCardsSection dashdata={dashboard} />
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 mt-6">
          <OrderStatusSection dashdata={dashboard} />
          <TopProduct dashboard={dashboard} />
          </div>
        <div className="mt-6 w-full">
          <RecentOrders dashboard={dashboard} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;