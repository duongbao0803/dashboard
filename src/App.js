import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./components/common/NoticeToast";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { COMMON_CONSTANT } from "./constants/common";
import { PATH_NAME } from "./constants/pathname";
import { AuthProvider } from "./context/AuthProvider";
import AuthPage from "./pages/AuthPage/AuthPage";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/Error/404";
import Page403 from "./pages/Forbidden/403";
import AppLayout from "./layout/AppLayout";
import EmployeeList from "./pages/Employee/EmployeeList";

const App = () => {
  const { COMMON, AUTH, DASHBOARD, EMPLOYEE } = PATH_NAME;
  const { ROLE_PERMISSION_ADMIN } = COMMON_CONSTANT;

  return (
    <NotificationProvider>
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
            path={EMPLOYEE.EMPLOYEE_LIST}
            element={
              <PrivateRoute requiredRole={ROLE_PERMISSION_ADMIN}>
                <AppLayout>
                  <EmployeeList />
                </AppLayout>
              </PrivateRoute>
            }
          />

          <Route path={COMMON.FORBIDDEN_PAGE} element={<Page403 />} />
          <Route path={COMMON.ERROR_PAGE} element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
