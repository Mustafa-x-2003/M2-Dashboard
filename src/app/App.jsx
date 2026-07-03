import { AuthProvider } from "../context/AuthContext";
import AppRoutes from "../routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <h1>11111</h1>
    </AuthProvider>
  );
}

export default App;
