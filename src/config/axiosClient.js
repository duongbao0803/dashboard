// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "https://65dc40aee7edadead7eb6bf3.mockapi.io",
// });

// export default axiosClient;

import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const access_token = Cookies.get("accessToken");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default axiosClient;
