import React from "react";
import RecentOrderItem from "./RecentOrderItem";
import DashboardOverviewGrid from "../DashboardOverviewGrid/DashboardOverviewGrid";

const RecentOrders = ({ dashboard }) => {
    const orders = dashboard?.recentOrders || [];

    return (
        <DashboardOverviewGrid
            title="Recent orders"
            subtitle="Latest customer activity"
            badge={
                <p className="bg-slate-200 text-cyan-600 rounded-full md:px-4 py-1 px-2 md:text-sm text-xs">
                    {orders.length} orders
                </p>
            }
        >
            {orders.map((order) => (
                <RecentOrderItem key={order._id} order={order} />
            ))}
        </DashboardOverviewGrid>
    );
};

export default RecentOrders;