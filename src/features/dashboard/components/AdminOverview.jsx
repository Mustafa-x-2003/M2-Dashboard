import React from "react";
import DashboardOverviewGrid from "./DashboardOverviewGrid/DashboardOverviewGrid";
const AdminOverview=()=>{
    return(
        <DashboardOverviewGrid title="Admin overview" subtitle="Real-time commerce health">
            <h2 className="text-lg text-[var(--text-secondary)] font-light">Monitor your storefront with AI-style clarity and live API metrics.</h2>
        </DashboardOverviewGrid>
    )
}
export default AdminOverview;