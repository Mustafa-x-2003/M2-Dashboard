import { useContext, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import Button from "../ui/Button";

import MenuContext from "../../context/MenuContext";
// import logo
import Logo from "../../assets/images/Logo.png"
// import data api
import { useAuth } from "../../context/AuthContext";
// import icons
import { IoMdMenu } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import ProductCard from "../ui/ProductCard";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  function toggleMenuOpen() {
    setIsMenuOpen(isMenuOpen ? false : true);
  }

  const buttons = {
    menu: {
      icon: isMenuOpen ? <RiCloseLargeFill /> : <IoMdMenu />,
      style:
        "block lg:hidden text-[var(--text)] text-lg bg-[var(--button-secondary)] border border-[var(--border)] cursor-pointer p-3 rounded-xl  ",
      callback: toggleMenuOpen,
    },
    Notifications: {
      icon: <MdOutlineNotificationsNone />,
      style:
        " text-[var(--text)] text-lg bg-[var(--button-secondary)] border border-[var(--border)] p-3 rounded-xl ",
    },
    theme: {
      icon: theme === "dark" ? <MdLightMode /> : <MdOutlineDarkMode />,
      style:
        " text-[var(--text)] text-lg  bg-[var(--button-secondary)] border border-[var(--border)] p-3 rounded-xl ",
      callback: toggleTheme,
    },
    logout: {
      icon: <FiLogOut />,
      style:
        "text-[16px]  py-2 px-4 gap-2  font-medium flex justify-center items-center rounded-xl cursor-pointer bg-[var(--danger)] text-[#eee] ",
      callback: logout,
      lable: "Logout",
    },
  };

  const butt = [
    {
      id: 0,
      icon: <MdOutlineNotificationsNone />,
      style:
        "text-2xl w-12 h-12 flex justify-center  items-center rounded-xl cursor-pointer bg-gray-200 relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-amber-500 after:top-3 after:left-7 ",
    },
    {
      id: 1,
      icon: theme === "dark" ? <MdLightMode /> : <MdOutlineDarkMode />,
      style:
        "text-2xl  w-12 h-12 flex justify-center items-center rounded-xl cursor-pointer bg-gray-200  ",
      callback: toggleTheme,
    },
    {
      id: 2,
      icon: <FiLogOut />,
      style:
        "text-[16px]  py-2 px-4 gap-2  font-medium flex justify-center items-center rounded-xl cursor-pointer bg-[var(--danger)] text-[#eee] ",
      lable: "Logout",
      callback: logout,
    },
  ];

  return (
    <div className="fixed top-0 left-0  lg:left-70 z-1000 right-0 ">
      <div className="h-20 bg-[var(--navbar)] transition-all duration-300 border-b border-[var(--border)] flex justify-between px-10 items-center">
        <h1 className=" hidden lg:block  text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text)]">
          <ProductCard name={'M2-Dashboard'} image={Logo}/>
        </h1>
        <Button
          icon={buttons.menu.icon}
          style={`${buttons.menu.style} `}
          callback={buttons.menu.callback}
        />
        <div className="flex justify-between gap-3">
          <Button
            icon={buttons.Notifications.icon}
            style={`${buttons.Notifications.style}`}
          />

          <Button
            icon={buttons.theme.icon}
            style={`${buttons.theme.style}`}
            callback={buttons.theme.callback}
          />
          <Button
            icon={buttons.logout.icon}
            style={`${buttons.logout.style}`}
            lable={buttons.logout.lable}
            callback={buttons.logout.callback}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
