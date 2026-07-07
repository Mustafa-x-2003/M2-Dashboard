import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Button from "../ui/Button";
// import data api
import { useAuth } from "../../context/AuthContext";
// import icons
import { MdOutlineNotificationsNone } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useAuth();
  const buttons = [
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
    <div className="fixed top-0 left-0   lg:left-70 z-1000 right-0 ">
      <div className="h-20 bg-[var(--navbar)] transition-all duration-300 border-b border-[var(--border)] flex justify-between px-10 items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text)]">my header</h1>

        <div className="flex justify-between gap-3">
          {buttons.map((button) => {
            return (
              <Button
                key={button.id}
                icon={button.icon}
                style={button.style}
                lable={button.lable}
                callback={button.callback}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
