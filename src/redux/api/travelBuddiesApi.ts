import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const travelBuddiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /* ========== Requests (traveler -> trip creator) ========== */

    requestToJoin: build.mutation({
      query: ({ tripId, ...restData }) => ({
        url: `/travel-buddy-requests/trips/${tripId}`,
        method: "POST",
        contentType: "application/json",
        data: restData,
      }),
      invalidatesTags: [tagTypes.travelBuddies],
    }),

    getRequestEligibility: build.query({
      query: ({ tripId }) => ({
        url: `/travel-buddy-requests/eligibility/${tripId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.travelBuddies],
    }),

    getTravelRequestHistroy: build.query({
      query: () => ({
        url: `/travel-buddy-requests/history`,
        method: "GET",
      }),
      providesTags: [tagTypes.travelBuddies],
    }),

    // trip creator: all join requests of a trip
    getTravelBuddyRequests: build.query({
      query: ({ tripId }) => ({
        url: `/travel-buddy-requests/trips/${tripId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.travelBuddies],
    }),

    // trip creator: approve / reject a join request
    respondTravelRequest: build.mutation({
      query: ({ requestId, status }) => ({
        url: `/travel-buddy-requests/${requestId}/respond`,
        method: "PATCH",
        contentType: "application/json",
        data: { status },
      }),
      invalidatesTags: [tagTypes.travelBuddies],
    }),

    /* ========== Invitations (trip creator -> traveler) ========== */

    inviteTraveller: build.mutation({
      query: ({ tripId, buddyId }) => ({
        url: `/travel-buddy-invitations/trips/${tripId}`,
        method: "POST",
        contentType: "application/json",
        data: { buddyId },
      }),
      invalidatesTags: [tagTypes.travelBuddies],
    }),

    // trip creator: all invitations sent for a trip
    getTripInvitations: build.query({
      query: ({ tripId }) => ({
        url: `/travel-buddy-invitations/trips/${tripId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.travelBuddies],
    }),
  }),
});

export const {
  useRequestToJoinMutation,
  useGetRequestEligibilityQuery,
  useGetTravelRequestHistroyQuery,
  useGetTravelBuddyRequestsQuery,
  useRespondTravelRequestMutation,
  useInviteTravellerMutation,
  useGetTripInvitationsQuery,
} = travelBuddiesApi;
