import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../constants/pathname";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { AUTH, DASHBOARD } = PATH_NAME;

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    navigate(DASHBOARD.STATISTIC);
  };

  const logout = () => {
    setUser(null);
    navigate(AUTH.REGISTER);
  };

  const isAuthenticated = !!user;
  const hasPermission = (requiredRole) =>
    user && user.role && user.role === requiredRole;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, hasPermission, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
