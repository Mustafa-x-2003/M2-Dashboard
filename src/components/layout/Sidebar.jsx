import React from "react";
import { Link } from "react-router";
import SidebarItem from "../ui/SidebarItem";
// import icons
import { FiHome } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const links = [
  { icon: <FiHome />, label: "Dashboard", path: "dashboard" },
  { icon: <LuUsers />, label: "Users", path: "users" },
  { icon: <AiOutlineProduct />, label: "Products", path: "products" },
  { icon: <IoMdAdd />, label: "Add Product", path: "addProduct" },
  { icon: <MdOutlineEventNote />, label: "Orders", path: "orders" },
  { icon: <IoCartOutline />, label: "Carts", path: "carts" },
  { icon: <IoSettingsOutline />, label: "Settings", path: "settings" },
];

function Sidebar() {
  return (
    
      <ul className=" w-full  pr-5 flex flex-col   h-[43%]   justify-between">
        {links.map((link) => {
          return (
            <SidebarItem
              key={link.label}
              icon={link.icon}
              label={link.label}
              path={link.path}
            />
          );
        })}
      </ul>

  );
}

export default Sidebar;
