import React from "react";
import { Link } from "react-router";

export default function SidebarItem({ icon, label, path }) {
  return (
    <Link to={path}>
      <li className="py-2.5 px-3 flex gap-2 items-center text-lg text-[var(--text)] hover:bg-[var(--btn_sidebar_hover)] transition duration-300  rounded-xl">
       <span>{icon}</span> {label}
      </li>
    </Link>
  );
}
