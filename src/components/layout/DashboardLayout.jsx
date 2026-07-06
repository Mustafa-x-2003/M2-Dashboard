import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-fit bg-[var(--background)]">
      <aside className="hidden lg:block left-0 top-0 h-screen w-71 bg-[var(--sidebar)] border-r border-[var(--border)]">
        <Sidebar />
      </aside>

      <div className="flex h-full flex-1 flex-col">
        <Navbar />

        <main className="mt-20 min-w-0 flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}