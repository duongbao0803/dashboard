/* eslint-disable no-unused-vars */
import React from "react";
import EmployeeList from "../EmployeeList";
import Title from "../Title";


function EmployeeManagementView() {
  return (
    <div className="p-5">
      <Title />
      <EmployeeList />
    </div>
  );
}

export default EmployeeManagementView;
