import { AuthProvider } from "../../context/AuthContext";
import {ThemeProvider} from "../../context/ThemeContext";
import { IsMenuOpenProvider } from "../../context/MenuContext";
export default function Providers({ children }) {
  return (
    <IsMenuOpenProvider>
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
    </IsMenuOpenProvider>
  );
}