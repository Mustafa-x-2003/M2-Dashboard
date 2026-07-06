import React from "react";
import { Link } from "react-router";

function Sidebar() {
  return (
    <ul className="w-full overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-8 lg:pt-10">
      <li>
        <Link to="dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="products">Products</Link>
      </li>
      <li>
        <Link to="orders">Orders</Link>
      </li>
      <li>
        <Link to="users">Users</Link>
      </li>
    </ul>
  );
}

export default Sidebar;
