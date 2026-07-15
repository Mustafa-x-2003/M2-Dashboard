import React, { useContext } from "react";
import { NavLink } from "react-router";
import MenuContext from "../../context/MenuContext";

export default function SidebarItem({ icon, label, path }) {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  return (
    <button onClick={()=>{
      if(isMenuOpen){
        setIsMenuOpen(false)
      }
    }}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `py-2.5 px-3 flex gap-3  items-center  font-medium text-[var(--text)] hover:bg-[var(--sidebar-hover)]  transition duration-300  rounded-2xl  ${
            isActive ? "bg-[var(--sidebar-hover)]" : ""
          }`
        }
      >
        <span>{icon}</span> {label}
      </NavLink>
    </button>
  );
}
