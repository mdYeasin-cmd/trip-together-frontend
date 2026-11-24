import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const buddyRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    requestToJoin: build.mutation({
      query: ({ tripId, ...restData }) => ({
        url: `/travel-buddy-requests/${tripId}`,
        method: "POST",
        contentType: "application/json",
        data: restData,
      }),
      invalidatesTags: [tagTypes.buddyRequests],
    }),

    getRequestEligibility: build.query({
      query: ({ tripId }) => ({
        url: `/travel-buddy-requests/eligibility/${tripId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.buddyRequests],
    }),

    getTravelRequestHistroy: build.query({
      query: () => ({
        url: `/travel-buddy-requests/history`,
        method: "GET",
      }),
      providesTags: [tagTypes.buddyRequests],
    }),

    // trip creator: all join requests of a trip
    getTravelBuddyRequests: build.query({
      query: ({ tripId }) => ({
        url: `/travel-buddy-requests/${tripId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.buddyRequests],
    }),

    // trip creator: approve / reject a join request
    respondTravelRequest: build.mutation({
      query: ({ requestId, status }) => ({
        url: `/travel-buddy-requests/${requestId}/respond`,
        method: "PATCH",
        contentType: "application/json",
        data: { status },
      }),
      invalidatesTags: [tagTypes.buddyRequests],
    }),
  }),
});

export const {
  useRequestToJoinMutation,
  useGetRequestEligibilityQuery,
  useGetTravelRequestHistroyQuery,
  useGetTravelBuddyRequestsQuery,
  useRespondTravelRequestMutation,
} = buddyRequestApi;
