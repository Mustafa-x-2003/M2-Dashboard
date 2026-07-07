import React, { createContext, useState } from "react";
const MenuContext = createContext();

function IsMenuOpenProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export default MenuContext;
export { IsMenuOpenProvider };
