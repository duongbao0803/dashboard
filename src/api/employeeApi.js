import axiosClient from "../config/axiosClient";

const getAllEmployees = (page, size) => {
  return axiosClient.get("/employees", page, size);
};

const editEmployee = (updatedItem) => {
  return axiosClient.put("/employees", updatedItem);
};

const addNewEmployee = (addItem) => {
  return axiosClient.post("/employees", addItem);
};

const removeEmployee = (itemId) => {
  return axiosClient.delete(`/employees/${itemId}`);
};

export { getAllEmployees, editEmployee, addNewEmployee, removeEmployee };
