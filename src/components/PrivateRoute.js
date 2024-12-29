import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { PATH_NAME } from "../constants/pathname";

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasPermission } = useAuth();
  const { COMMON, AUTH } = PATH_NAME;

  if (!isAuthenticated) {
    return <Navigate to={AUTH.REGISTER} />;
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to={COMMON.FORBIDDEN_PAGE} />;
  }

  return children;
};

export default PrivateRoute;
