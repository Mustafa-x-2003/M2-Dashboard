import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import Button from "../ui/Button";

import MenuContext from "../../context/MenuContext";
// import logo
import Logo from "../../assets/images/Logo.png";
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
import { getCurrentUser } from "../../features/auth/service/authService";
import { cache } from "react";
function InfoCard({ name, rol ,avatar}) {
  return (
    <div className=" hidden lg:flex gap-2  bg-[var(--card)] py-2 px-3 rounded-[20px] border transition-all duration-300  border-[var(--border)] justify-between items-center  ">
      <img
        src={ avatar || "https://i.pravatar.cc/150"}
        alt={name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300  object-cover border"
        style={{
          borderColor: "var(--border)",
        }}
      />
      <div className=" ">
        <h2 className="text-base font-semibold transition-all duration-300 text-[var(--text)] ">
          {name}
        </h2>

        <p className="text-xs transition-all duration-300 text-[var(--text-secondary)]">
          {rol}
        </p>
      </div>
    </div>
  );
}
function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const [currentUser, setCurrentUser] = useState();
  function toggleMenuOpen() {
    setIsMenuOpen(isMenuOpen ? false : true);
  }
  const buttons = {
    menu: {
      icon: isMenuOpen ? <RiCloseLargeFill /> : <IoMdMenu />,
      style:
        "block lg:hidden text-[var(--text)] text-lg bg-[var(--button-secondary)] border border-[var(--border)] cursor-pointer flex justify-center  items-center w-12 h-12 p-2 rounded-xl  ",
      callback: toggleMenuOpen,
    },
    Notifications: {
      icon: <MdOutlineNotificationsNone />,
      style:
        " text-[var(--text)] text-lg bg-[var(--button-secondary)] border border-[var(--border)] flex justify-center  items-center w-12 h-12 p-2 rounded-xl relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-[var(--danger)] after:top-3 after:left-7",
    },
    theme: {
      icon: theme === "dark" ? <MdLightMode /> : <MdOutlineDarkMode />,
      style:
        " text-[var(--text)] text-lg   bg-[var(--button-secondary)] border border-[var(--border)] flex justify-center  items-center w-12 h-12 p-2 rounded-xl ",
      callback: toggleTheme,
    },
    logout: {
      icon: <FiLogOut />,
      style:
        "text-[16px]  flex justify-center  items-center w-12 h-12 lg:w-fit lg:h-fit py-2  px-3 gap-2  font-medium flex justify-center items-center rounded-xl cursor-pointer bg-[var(--danger)] text-[#eee] ",
      callback: logout,
      lable: "Logout",
    },
  };

  useEffect(() => {
    async function grtCurrentUser() {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (e) {
        console.log(e);
      }
    }
    grtCurrentUser();
  }, []);

  return (
    <div className="fixed top-0 left-0  lg:left-72 z-1000 right-0 ">
      <div className="h-20 bg-[var(--navbar)] transition-all duration-300 border-b border-[var(--border)] flex justify-between px-5  h-[80px] items-center">
        <h1 className=" hidden lg:block  text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text)]">
          <ProductCard name={"M2-Dashboard"} image={Logo} />
        </h1>
        <Button
          icon={buttons.menu.icon}
          style={`${buttons.menu.style} `}
          callback={buttons.menu.callback}
        />
        <div className="flex justify-center  items-center gap-3">
          <Button
            icon={buttons.Notifications.icon}
            style={`${buttons.Notifications.style}`}
          />

          <Button
            icon={buttons.theme.icon}
            style={`${buttons.theme.style}`}
            callback={buttons.theme.callback}
          />
          <InfoCard
            name={currentUser?.user.username}
            rol={currentUser?.user.role}
            avatar={currentUser?.user.avatar}
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
