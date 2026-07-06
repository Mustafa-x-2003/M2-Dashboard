import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  function toggleTheme() {
    setTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
export { ThemeProvider };
