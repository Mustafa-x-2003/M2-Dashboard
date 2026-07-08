import React, { useContext } from "react";

import MenuContext from "../../context/MenuContext";
export default function Drawr({ children }) {
  const { isMenuOpen } = useContext(MenuContext);
  return (
    <div
      className={`fixed pt-20 z-999 opacity-97 ${isMenuOpen ? "left-0" : "-left-80"} top-0 h-screen w-70 bg-[var(--sidebar)] border-r border-[var(--border)] transition-all duration-300`}
    >
      {children}
    </div>
  );
}
