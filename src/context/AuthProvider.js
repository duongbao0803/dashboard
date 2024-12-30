import Cookies from "js-cookie";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../constants/pathname";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { AUTH, EMPLOYEE } = PATH_NAME;

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginPermission = (userData) => {
    // setUser(userData);
    const {role, email } = userData
    navigate(EMPLOYEE.EMPLOYEE_LIST);
    localStorage.setItem("info", JSON.stringify({role, email}));
  };

  const logout = () => {
    setUser(null);
    navigate(AUTH.REGISTER);
  };

  const isAuthenticated = !!Cookies.get("accessToken");
  const userData = JSON.parse(localStorage.getItem("info"));

  const hasPermission = (requiredRole) =>
    userData && userData.role === requiredRole;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, hasPermission, loginPermission, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
