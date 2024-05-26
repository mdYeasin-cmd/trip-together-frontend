import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const tripsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createATrip: build.mutation({
      query: (data) => ({
        url: "/trips",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.trips],
    }),

    getAllTrips: build.query({
      query: () => ({
        url: "/trips",
        method: "GET",
      }),
      providesTags: [tagTypes.trips],
    }),

    deleteATrip: build.mutation({
      query: (id) => ({
        url: `/trips/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.trips],
    }),
  }),
});

export const {
  useCreateATripMutation,
  useGetAllTripsQuery,
  useDeleteATripMutation,
} = tripsApi;
