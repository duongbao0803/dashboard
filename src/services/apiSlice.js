import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

const axiosBaseQuery = async (args, api, extraOptions) => {
  let token = Cookies.get("accessToken");
  const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = Cookies.get("refreshToken");
    const rfToken = JSON.stringify(refreshToken);

    if (rfToken) {
      const res = await baseQuery(
        {
          url: "/authen/refresh-token",
          method: "POST",
          body: rfToken,
        },
        api,
        extraOptions
      );

      const refreshData = res.data;

      if (refreshData) {
        const newAccessToken = refreshData.accessToken;
        Cookies.set("accessToken", newAccessToken);
        token = newAccessToken;

        if (typeof args === "object") {
          result = await baseQuery(
            {
              ...args,
              headers: {
                ...args.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            },
            api,
            extraOptions
          );
        }
      } else {
      }
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
});

export default apiSlice;
