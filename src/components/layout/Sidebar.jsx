import React from "react";
import { Link } from "react-router";

function Sidebar() {
  return (
    <ul className=" w-full p-5 flex flex-col gap-5  h-[50%]   justify-between">
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
