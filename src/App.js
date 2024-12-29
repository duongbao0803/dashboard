import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Error/AuthPage/AuthPage";
import Page403 from "./pages/Forbidden/403";
import Page404 from "./pages/Error/404";
import { PATH_NAME } from "./constants/pathname";
import { COMMON_CONSTANT } from "./constants/common";

const App = () => {
  const { COMMON, AUTH, DASHBOARD } = PATH_NAME;
  const { ROLE_PERMISSION_ADMIN } = COMMON_CONSTANT;

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path={AUTH.REGISTER}
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path={DASHBOARD.STATISTIC}
            element={
              <PrivateRoute requiredRole={ROLE_PERMISSION_ADMIN}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path={COMMON.FORBIDDEN_PAGE} element={<Page403 />} />
          <Route path={COMMON.ERROR_PAGE} element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
