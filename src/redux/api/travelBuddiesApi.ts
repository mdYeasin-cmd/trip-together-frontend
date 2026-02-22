import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const travelBuddiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    requestToJoin: build.mutation({
      query: (data) => {
        console.log(data, "data in buddies apoi");
        const { tripId, ...restData } = data;

        console.log(restData, "rest data api");
        return {
          url: `/travel-buddies/${tripId}/request`,
          method: "POST",
          contentType: "application/json",
          data: restData,
        };
      },
      invalidatesTags: [tagTypes.travelBuddies],
    }),

    getRequestEligibility: build.query({
      query: (data) => {
        const { tripId } = data;
        return {
          url: `/travel-buddies/request-eligibility/${tripId}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.travelBuddies],
    }),

    getTravelRequestHistroy: build.query({
      query: () => {
        return {
          url: `/travel-buddies/request-history`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.travelBuddies],
    }),
  }),
});

export const {
  useRequestToJoinMutation,
  useGetRequestEligibilityQuery,
  useGetTravelRequestHistroyQuery,
} = travelBuddiesApi;
