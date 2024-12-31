/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet";
import { UserManagementView } from "@/sections/users/view";
import { EmployeeManagementView } from "../sections/employee/view";

function EmployeeManagement() {
  return (
    <div>
      <Helmet>
        <title> EMS | Quản lý nhân viên </title>
      </Helmet>
      <EmployeeManagementView />
    </div>
  );
}

export default EmployeeManagement;
