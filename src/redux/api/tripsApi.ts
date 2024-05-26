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
    }),
  }),
});

export const { useCreateATripMutation } = tripsApi;
