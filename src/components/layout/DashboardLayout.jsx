import { Outlet } from "react-router";
// import DashboardOverviewGrid from "../../features/dashboard/components/DashboardOverviewGrid/DashboardOverviewGrid";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Drawr from "./Drawr";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen transition-all duration-300 bg-[var(--background)]">
      <aside className=" hidden lg:block fixed z-1000 left-0 top-0 h-screen w-70 bg-[var(--sidebar)] border-r border-[var(--border)] transition-all duration-300">
        <div className="px-6 pt-4 items-center">
          <h5 className="md:tracking-[3px] uppercase text-cyan-400  text-[12px] mt-2">
            Commerce
          </h5>

          <h1 className=" md:text-xl text-[var(--text)] transition-all duration-300 mb-4 mt-2 font-semibold">
            Admin Panel
          </h1>
        </div>
        <Sidebar />
      </aside>
      <Drawr>
        <Sidebar />
      </Drawr>

      <div className="flex-1 lg:ml-70">
        <Navbar />

        <main className="mt-20 min-h-[calc(100vh-80px)] w-screen lg:w-[calc(100vw-280px)] overflow-auto p-1 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
