import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen transition-all duration-300 bg-[var(--background)]">
      <aside className="fixed left-0 top-0 h-screen w-70 bg-[var(--sidebar)] border-r border-[var(--border)] transition-all duration-300">
        <h1 className="py-3 pl-8 text-[var(--text)] text-2xl font-bold flex  items-center ">
          M2-Dashboard
        </h1>
        <Sidebar />
      </aside>

      <div className="flex-1 ml-70">
        <Navbar />

        <main className="mt-20 transition-all duration-300 p-1 min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
