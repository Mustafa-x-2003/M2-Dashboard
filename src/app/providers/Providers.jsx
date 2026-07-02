import { AuthProvider } from "../../context/AuthContext";
import { ThemeProvider } from "../../contexts/ThemeContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
