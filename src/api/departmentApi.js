import axiosClient from "../config/axiosClient";

const getAllDepartments = (page, size) => {
  return axiosClient.get("/departments", page, size);
};

const editDepartment = (updatedItem) => {
  return axiosClient.put("/departments", updatedItem);
};

const addNewDepartment = (addItem) => {
  return axiosClient.post("/departments", addItem);
};

export { getAllDepartments, editDepartment, addNewDepartment };
