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
        const { userId, tripId } = data;
        return {
          url: `/travel-buddies/request-eligibility/${tripId}/${userId}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.travelBuddies],
    }),
  }),
});

export const { useRequestToJoinMutation, useGetRequestEligibilityQuery } =
  travelBuddiesApi;
