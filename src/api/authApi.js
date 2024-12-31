import axiosClient from "../config/axiosClient";

const loginUser = (credential) => {
  return axiosClient.post("/auth/login", credential);
};

export { loginUser };
