import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Drawr from "./Drawr";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--background)] transition-all duration-300">
      <aside className="fixed pl-6 left-0 top-0 z-[1000] hidden h-screen w-72 border-r border-[var(--border)] bg-[var(--sidebar)] transition-all duration-300 lg:block">
        <div className="items-center pl-2 pt-4">
          <h5 className="mt-2 text-[12px] uppercase tracking-[3px] text-cyan-400">
            Commerce
          </h5>

          <h1 className="mb-4 mt-2 text-xl font-semibold text-[var(--text)] transition-all duration-300">
            Admin Panel
          </h1>
        </div>
        <Sidebar />

        <div className="bg-[var(--card)]  transition-colors duration-300 border border-[var(--border)] p-4 rounded-2xl w-60  absolute bottom-4 ">
          <p className="text-[var(--text)] transition-colors duration-300">L I V E</p>
          <h2 className="text-[var(--text-secondary)] w-full  pt-2 transition-colors duration-300">
            Connected to the E-commerce API
          </h2>
        </div>
      </aside>

      <Drawr>
        <Sidebar />
      </Drawr>

      <div className="min-w-0 w-screen lg:w-[calc(100vw-280px)] flex-1 lg:ml-72">
        <Navbar />

        <main className="mt-20 min-h-[calc(100vh-80px)]  overflow-auto p-1 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
