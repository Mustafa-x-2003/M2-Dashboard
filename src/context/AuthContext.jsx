import { createContext, useContext, useEffect, useState } from "react";
import {

  getCurrentUser,
} from "../features/auth/service/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
const [loading, setLoading] = useState(true);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user);
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);