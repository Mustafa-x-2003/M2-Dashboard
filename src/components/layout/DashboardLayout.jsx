import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white hidden md:block">
        <Sidebar />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar toggleDark={toggleDark} />

        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}