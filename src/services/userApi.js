import apiSlice from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: JSON.stringify(credentials)
      }),
      // invalidatesTags: ['User']
    }),
  }),
});

export const { useLoginMutation } = userApi;

export default userApi;
