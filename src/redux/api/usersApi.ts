import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),

    getATraveler: build.query({
      query: (travelerId) => ({
        url: `/users/travelers/${travelerId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),

    changeUserStatus: build.mutation({
      query: (data) => ({
        url: "/change-user-status",
        method: "PATCH",
        data,
      }),
      transformErrorResponse: (data) => {
        console.log(data, "transformErrorResponse");
        return data;
      },
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetATravelerQuery,
  useChangeUserStatusMutation,
} = usersApi;
