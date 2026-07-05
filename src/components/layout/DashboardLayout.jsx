import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-600">
        <Sidebar />
      </aside>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 bg-amber-600 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
