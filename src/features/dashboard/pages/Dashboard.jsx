import React, { useEffect, useState } from "react";
import AdminOverview from "../components/AdminOverview";
import { getDashboard } from "../services/dashboardApi";
import StatusCardsSection from "../components/StatusCardsSection";
import OrderStatusSection from "../components/OrderStatusSection";
import TopProduct from "../components/TopProduct/TopProduct";
import RecentOrders from "../components/RecentOrder/RecentOrders";
import PageLoader from "../../../components/ui/PageLoader";

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
    <div>
      <div className="p-4 lg:p-6">
        {!dashboard ? (
          <>
            <PageLoader text="Loading admin overview..." />
            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
                <div className="mb-6 h-5 w-44 animate-pulse rounded-full bg-[var(--border)]"></div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-[var(--border)]"></div>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
                <div className="mb-6 h-5 w-40 animate-pulse rounded-full bg-[var(--border)]"></div>
                <div className="mx-auto h-52 w-52 animate-pulse rounded-full bg-[var(--border)]"></div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow)]">
              <div className="mb-6 h-5 w-48 animate-pulse rounded-full bg-[var(--border)]"></div>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-[var(--border)] pb-4"
                  >
                    <div>
                      <div className="mb-3 h-4 w-40 animate-pulse rounded-full bg-[var(--border)]"></div>
                      <div className="h-4 w-28 animate-pulse rounded-full bg-[var(--border)]"></div>
                    </div>
                    <div className="h-5 w-24 animate-pulse rounded-full bg-[var(--border)]"></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <AdminOverview />

            <div className="pt-8">
              <StatusCardsSection dashdata={dashboard} />

              <div className="mt-6 h-fit grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
                <OrderStatusSection dashdata={dashboard} />
                <TopProduct dashboard={dashboard} />
              </div>

              <div className="mt-6 w-full">
                <RecentOrders dashboard={dashboard} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
