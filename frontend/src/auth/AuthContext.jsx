import { createContext, useContext, useState } from "react";
import { getToken, setToken, login as apiLogin, register as apiRegister } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(Boolean(getToken()));

  const login = async (email, password) => {
    await apiLogin(email, password);
    setAuthenticated(true);
  };

  const register = async (email, username, password) => {
    await apiRegister(email, username, password);
    await login(email, password);
  };

  const logout = () => {
    setToken(null);
    setAuthenticated(false);
  };

  return <AuthContext.Provider value={{ authenticated, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
