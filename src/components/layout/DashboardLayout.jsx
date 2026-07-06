
import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <aside className="hidden lg:block lg:w-80 bg-gray-600">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="min-w-0 flex-1 overflow-y-auto bg-amber-600">
          <Outlet />
        </main>
      </div>
    </div>
  );
}